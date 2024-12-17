import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AuthRepository } from "./authentication.repository.js";

export default class AuthController {
  constructor() {
    this.authRepository = new AuthRepository();
  }

  async signUp(req, res) {
    //If user registers we will get name,email,password,gender in request
    const { name, email, password, gender } = req.body;

    //now need to hash the password before saving in database for safety
    const hashedpassword = await bcrypt.hash(password, 12);

    //After that we need to create a new user with given data and save the user in database using mongoose

    const newUser = await this.authRepository.createUser({
      name: name,
      email: email,
      password: hashedpassword,
      gender: gender,
    });
    //Sending the response to client
    if (newUser) {
      return res.status(200).send(newUser);
    } else {
      return res.status(400).send("Something went wrong");
    }
  }

  async signIn(req, res) {
    //we will get email/username and password from client
    try {
      //Now we need to verify these details in DB and respond bacvck to user
      const validationResponse = await this.authRepository.validateSignIn(
        req?.body
      );
      console.log(validationResponse, ":validationresponse");

      if (validationResponse.status !== 200) {
        return res.status(validationResponse?.status).send(validationResponse);
      } else {
        //Since email and password are valid, we will create a JWT Token and send it to the client,
        //So that Client can send in the authorization header,so next we can verify the user,
        // leading to a statefull communicatiob b/w client and server in stateless protocol
        const jwtToken = jwt.sign(
          {
            userEmail: validationResponse?.user?.email,
            user: validationResponse?.user,
          },
          "secretkey1",
          {
            expiresIn: "1h",
          }
        );
        //res.setHeader("set-cookie", `jwtToken=${jwtToken};path=/`);
        res.cookie("jwtToken", jwtToken, { maxAge: 60 * 60 * 1000 });
        return res.status(validationResponse.status).send({
          token: jwtToken,
          message: "Login Successfull",
          expires: "1h",
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async signOut(req, res) {
    res.clearCookie("jwtToken");
    res.status(200).send({
      status: "Logged Out Successfully",
    });
  }
}

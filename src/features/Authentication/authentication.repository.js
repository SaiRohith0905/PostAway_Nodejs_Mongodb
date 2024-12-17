import mongoose from "mongoose";
import { AuthModel } from "./authentication.schema.js";
import bcrypt from "bcrypt";

export class AuthRepository {
  async createUser(newuserdata) {
    try {
      const newUser = new AuthModel(newuserdata);
      await newUser.save();
      return newUser;
    } catch (err) {
      console.log(err);
    }
  }

  async validateSignIn(userdata) {
    try {
      const { email, password } = userdata;

      //find the user in database

      const userFound = await AuthModel.findOne({ email: email });
      //console.log(userFound, ":UserFound");
      if (!userFound) {
        return { message: "User not found", status: 404, user: null };
      } else {
        //Chcek if user has entered valid password
        const validPassword = await bcrypt.compare(
          password,
          userFound.password
        );
        // console.log(validPassword);
        if (validPassword) {
          return { message: "Login Successful", status: 200, user: userFound };
        } else {
          return { message: "Invalid Credentials", status: 400, user: null };
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
}

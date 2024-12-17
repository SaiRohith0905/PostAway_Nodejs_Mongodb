import jwt from "jsonwebtoken";

// export default function jwtAuthMiddleware(req, res, next) {
//   const jwt_Token = req.headers["authorization"];
//   console.log(jwt_Token);
//   const rawToken = jwt_Token.split("Bearer ")[1];
//   console.log(jwt_Token.split("Bearer "));

//   const tokenPayload = jwt.verify(rawToken, "secretkey1");
//   console.log(tokenPayload, "token payload");
//   //if(){}
//   next();
// }

export default function jwtAuthMiddleware(req, res, next) {
  //Now we need to verify the user
  const authorizationValue = req.headers["authorization"];
  if (!authorizationValue) {
    return res.send({ message: "Invalid Token" });
  }
  const rawToken = authorizationValue.split("Bearer ");
  const token = rawToken[1];

  const tokenPayload = jwt.verify(token, "secretkey1");
  req.userId = tokenPayload.user._id;
  next();
}

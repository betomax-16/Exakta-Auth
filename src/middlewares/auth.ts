// checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
//     return bcrypt.compareSync(unencryptedPassword, this.password);
//   }


import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  //Get the jwt token from the head
  const JWT_SECRET = 'BETO';
  const token = <string>req.headers["auth"];
  let jwtPayload;
  
  //Try to validate the token and get data
  try {
    jwtPayload = <any>jwt.verify(token, JWT_SECRET || process.env.JWT_SECRET);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    res.status(401).send({message: 'unauthorized'});
    return;
  }

  //The token is valid for 1 hour
  //We want to send a new token on every request
  const { username, rol } = jwtPayload;
  (req as any).jwtPayload = jwtPayload;
  
  // const newToken = jwt.sign({ userId, username }, JWT_SECRET || process.env.JWT_SECRET, {
  //   expiresIn: "1h"
  // });
  // res.setHeader("token", newToken);

  //Call the next middleware or controller
  next();
};
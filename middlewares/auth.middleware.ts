import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ReqUser } from "./reqUser";
import { User } from "../models/User.model";
import { AppError } from "../utils/error";

export const requireSignIn = async (
  req: ReqUser<any, any, any, any>,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Authentication token is missing" });
    }
    token = token.split(" ")[1];
    const decode: any = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return res.status(401).json({ message: "Invalid token" });
    }
    const userdet = await User.findOne({ where: { id: decode.userId } });
    if (userdet) req.user = userdet;
    next();
  } catch (error) {
    console.log(error);
    return next(new AppError("Internal Server Error", 500));
  }
};

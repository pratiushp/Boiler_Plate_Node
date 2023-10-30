import { comparePasswords, hashPassword } from "../helpers/authHelper";

import { generateToken } from "../helpers/jwtToken";
import jwt from "jsonwebtoken";
import { sendMail } from "../helpers/sendMail";
import { User } from "../models/User.model";

import { NextFunction, Response, Request } from "express";
import speakeasy from "speakeasy";
import { OTP } from "../models/OTP.model";
import successMiddleware from "../utils/success.response";
import { AppError } from "../utils/error";
import {
  forgetPasswordService,
  loginService,
  registerService,
  resetPasswordService,
  userBody,
} from "../services/auth.service"; // Import the authService

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;

  try {
    const newUser = await registerService(name, email, password, res);

    successMiddleware(
      {
        success: true,
        message: "User Register Successfully",
        data: newUser,
      },
      res
    );
  } catch (error) {
    next(error);
  }
};

//Login Controller
export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const token = await loginService(email, password, res);

    if (token) {
      successMiddleware(
        {
          success: true,
          message: "Login Success",
          data: token,
        },
        res
      );
    }
  } catch (error) {
    next(error);
  }
};
//function for forget password
export const forgetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    const forgetpassword = await forgetPasswordService({ email });

    successMiddleware(
      {
        success: true,
        message: `Please check your email: ${email} to reset your password`,
      },
      res
    );
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, otpCode, newPassword } = req.body;

    const resetpassword = await resetPasswordService({
      email,
      otpCode,
      newPassword,
    });

    successMiddleware(
      {
        success: true,
        message: "Password Successfully Reset",
      },
      res
    );
  } catch (error) {
    next(error);
  }
};

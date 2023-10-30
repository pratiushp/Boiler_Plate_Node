import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/error";
import { User } from "../models/User.model";
import { comparePasswords, hashPassword } from "../helpers/authHelper";
import { generateToken } from "../helpers/jwtToken";
import { OTP } from "../models/OTP.model";
import speakeasy from "speakeasy";
import { sendMail } from "../helpers/sendMail";

export interface userBody {
  name: string;
  email: string;
  password: string;
}

export interface loginUser {
  email: string;
  password: string;
}

export interface ForgetPassword {
  email: string;
}

export interface ResetPassword {
  email: string;
  otpCode: string;
  newPassword: string;
}

export const registerService = async (
  name: string,
  email: string,
  password: string,
  res: Response
): Promise<userBody> => {
  const existingUser = await User.findOne({ where: { email: email } });

  if (existingUser) {
    throw new AppError("User Already Exist", 400);
  }

  const hashedPassword = await hashPassword(password);

  const newUser = User.create({
    name,
    email,
    password: hashedPassword,
  });
  try {
    await User.save(newUser);
    return newUser;
  } catch (error) {
    console.error(error);
    throw new AppError("Internal Server Error", 500);
  }
};

export const loginService = async (
  email: string,
  password: string,
  res: Response
): Promise<string> => {
  const user = await User.findOne({ where: { email, status: true } });

  if (!user) {
    throw new AppError("User Not Found", 400);
  }

  const passwordMatches = await comparePasswords(password, user.password);

  if (!passwordMatches) {
    throw new AppError("Password Invalid", 400);
  }

  const token = generateToken(user.id, user.name);

  return token;
};

export const forgetPasswordService = async (
  body: ForgetPassword
): Promise<void> => {
  const { email } = body;

  // Generate OTP
  const otpCode = speakeasy.totp({
    secret: speakeasy.generateSecret().base32,
    encoding: "base32",
  });

  // Find user by email
  const user = await User.findOne({ where: { email } });

  // Display error message if email not found
  if (!user) {
    throw new AppError("User Not Found", 400);
  }

  // Create an OTP
  const otp = OTP.create({
    code: otpCode,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    user,
  });
  try {
    // Save OTP in the database
    await OTP.save(otp);

    // Send a password reset email to the user
    await sendMail({
      email: user.email,
      subject: "Reset your password",
      message: `Hello ${user.name}, Your OTP for password reset is: ${otpCode}`,
    });
  } catch (error) {
    console.error(error);
    throw new AppError("Internal Server Error", 500);
  }
};

export const resetPasswordService = async (
  body: ResetPassword
): Promise<void> => {
  const { email, otpCode, newPassword } = body;

  // Find the user by email
  const user = await getUserfromEmail(email);

  if (!user) {
    throw new AppError("User Not Found", 400);
  }

  // Retrieve the associated OTP record
  const otp = await OTP.findOne({
    where: { user: { id: user.id } },
    order: { createdAt: "DESC" },
  });

  if (!otp || otp.code !== otpCode || otp.expiresAt < new Date()) {
    throw new AppError("Invalid or expired OTP", 400);
  }

  // Hash and update the user's password
  user.password = await hashPassword(newPassword);
  try {
    await user.save();
  } catch (error) {
    console.error(error);
    throw new AppError("Internal Server Error", 500);
  }
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */

export const getUsesFromId = async (id: number): Promise<User> => {
  return User.findOne({ where: { id: id } });
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
export const getUserfromEmail = async (email: string): Promise<User> => {
  return User.findOne({ where: { email: email } });
};

// Retrieve the associated OTP record
// const otp = await OTP.findOne({
//   where: { user: { id: user.id } },
//   order: { createdAt: "DESC" },
// });

/**
 * Get user by email
 * @param {number} id
 * @returns {Promise<OTP>}
 */

// export const getOTPofUser = async (id: number): Promise<OTP> => {
//   return OTP.createQueryBuilder("opt").leftJoinAndSelect("otp.user", "user.id");
// };

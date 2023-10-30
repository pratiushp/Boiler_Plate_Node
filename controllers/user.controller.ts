import { NextFunction, Request, Response } from "express";
import successMiddleware from "../utils/success.response";

import { User } from "../models/User.model";
import { AppError } from "../utils/error";
import {
  GetActiveUser,
  deleteService,
  getAlUserService,
  getUserByIDService,
} from "../services/user.service";

//Soft Delete User
export const userDelete = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = parseInt(req.params.id);

    await deleteService(userId);

    successMiddleware(
      {
        success: true,
        message: "User Deleted Successfully",
      },
      res
    );
  } catch (error) {
    next(error);
  }
};

//get all user function
export const getAllUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 3;
    const search = req.query.search as string;

    const options: GetActiveUser = { page, limit, search };

    const { users, totalPages, totalCount } = await getAlUserService(options);

    successMiddleware(
      {
        success: true,
        message: "Users retrieved successfully with pagination and search",
        data: { users, page, totalPages, totalCount },
      },
      res
    );
  } catch (error) {
    next(error);
  }
};

//get user by id function
export const getUserbyID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = parseInt(req.params.id);

    const userDet = await getUserByIDService(userId);

    successMiddleware(
      {
        success: true,
        message: "Successfully Get User By ID",
        data: userDet,
      },
      res
    );
  } catch (error) {
    next(error);
  }
};

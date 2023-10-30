import { User } from "../models/User.model";
import httpStatus from "http-status";
import { AppError } from "../utils/error";
import { getUsesFromId } from "./auth.service";

export interface GetActiveUser {
  page: number;
  limit: number;
  search?: string;
}

/**
 * Get user by email
 * @param {number} id
 * @returns {Promise<void>}
 */

export const deleteService = async (userId: number): Promise<void> => {
  if (!userId) {
    throw new AppError("User Not Found", 400);
  }

  const user = await getUsesFromId(userId);

  if (!user) {
    throw new AppError("User Not Found", 404);
  }
  try {
    user.status = false;
    await user.save();
  } catch (error) {
    console.log(error);
    throw new AppError("Internal Server Error", 500);
  }
};

/**
 * Get user by email
 * @param {}
 * @returns {Promise<User>}
 */

export const getAlUserService = async ({
  page,
  limit,
  search,
}: GetActiveUser): Promise<{
  users: User[];
  page: number;
  totalPages: number;
  totalCount: number;
}> => {
  try {
    const skip = (page - 1) * limit;

    const query = User.createQueryBuilder("user")
      .select(["user.id", "user.name", "user.email"])
      .where("user.status = :status", { status: true });

    if (search) {
      query.andWhere("(user.name LIKE :search)", { search: `%${search}%` });
    }

    query.orderBy("user.name", "ASC");

    const [users, totalCount] = await query
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const totalPages = Math.ceil(totalCount / limit);

    return {
      users,
      page,
      totalPages,
      totalCount,
    };
  } catch (error) {
    console.log(error);
    throw new AppError("Internal Server Error", 500);
  }
};

/**
 * Get user by email
 * @param {number} userId
 * @returns {Promise<any>}
 */

export const getUserByIDService = async (userId: number): Promise<any> => {
  try {
    if (!userId) {
      throw new AppError("User Not Found", 400);
    }

    const user = await getUsesFromId(userId);

    if (!user) {
      throw new AppError("User Not Found", 404);
    }

    const { password, resetToken, status, ...userDetails } = user;

    return userDetails;
  } catch (error) {
    console.log(error);
    throw new AppError("Internal Server Error", 500);
  }
};

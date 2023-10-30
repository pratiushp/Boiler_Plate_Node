import jwt from "jsonwebtoken";

export const generateToken = (
  userId: number,
  name: String
  //   usertype: String
): string => {
  const token = jwt.sign({ userId, name }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

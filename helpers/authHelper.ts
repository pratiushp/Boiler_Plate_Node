import bcrypt from "bcrypt";

const salt = 10;

export const hashPassword = async (plainPassword: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(plainPassword, salt);
  return hashedPassword;
};

export const comparePasswords = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  const match = await bcrypt.compare(plainPassword, hashedPassword);
  return match;
};

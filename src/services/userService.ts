import User, { IUser } from "../models/User";

export const createUser = async (data: Partial<IUser>) => {
  return await User.create(data);
};

export const findUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};

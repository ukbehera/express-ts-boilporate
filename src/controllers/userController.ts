import { Request, Response, NextFunction } from "express";
import { createUser, findUserByEmail } from "../services/userService";
import { userSchema } from "../validations/userValidation";
import logger from "../config/logger";

export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Validate Input
    const parsedData = userSchema.parse(req.body);

    // Check if email exists
    const existingUser = await findUserByEmail(parsedData.email);
    const err = 'Email already exists';
    if (existingUser) {
        logger.error(`Error registering user: ${err}`);
        res.status(400).json({ error: err })
    } else {
        // Create user
        const user = await createUser(parsedData);
        logger.info(`New user registered: ${user.email}`);
        res.status(201).json({ message: "User registered", user });
    }

  } catch (err) {
    next(err);
  }
};

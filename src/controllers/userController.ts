import { Request, Response, NextFunction } from "express";
import { createUser, findUserByEmail } from "../services/userService";
import { userSchema } from "../validations/userValidation";

export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Validate Input
    const parsedData = userSchema.parse(req.body);

    // Check if email exists
    const existingUser = await findUserByEmail(parsedData.email);
    if (existingUser) {
        res.status(400).json({ error: "Email already exists" })
    } else {
        // Create user
        const user = await createUser(parsedData);
        res.status(201).json({ message: "User registered", user });
    }

  } catch (err) {
    next(err);
  }
};

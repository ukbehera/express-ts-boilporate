import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import logger from "../config/logger";

// Define error-handling middleware with correct return type (void)
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = 500;
  let message = "Internal Server Error";

  if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation error";
    logger.warn(`Validation error: ${JSON.stringify(err.errors)}`);
    res.status(statusCode).json({ error: err.errors });
    return; // ✅ Explicitly return void
  }

  if (err instanceof Error) {
    message = err.message;
  }
  
  logger.error(`[${req.method}] ${req.url} - ${message}`);
  res.status(statusCode).json({ error: message });
  return; // ✅ Explicitly return void
};

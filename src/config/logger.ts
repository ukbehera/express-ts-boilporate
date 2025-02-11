import winston from "winston";

// Define Winston Logger with JSON format
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json() // 📌 Structured JSON logs
  ),
  transports: [
    new winston.transports.Console(), // 📌 Logs to stdout for EKS
  ],
});

export default logger;

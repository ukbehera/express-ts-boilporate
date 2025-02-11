import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { errorHandler } from "./middlewares/errorHandler";
import routes from "./routes";
import { setupSwagger } from "./doc/swagger";
import logger from "./config/logger";

const app = express();

// Security Middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// 📌 Setup Morgan for HTTP Logging
app.use(
  morgan("combined", {
    stream: {
      write: (message: string) => logger.info(message.trim()),
    },
  })
);

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests
});
app.use(limiter);

// Setup Swagger
setupSwagger(app);
// Routes
app.use("/api", routes);

// Global Error Handler
app.use(errorHandler);

export default app;

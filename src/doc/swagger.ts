import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API Documentation",
    version: "1.0.0",
    description: "API documentation for the Express TypeScript application",
  },
  servers: [
    {
      url: "http://localhost:5000/api",
      description: "Development Server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts"], // Include routes
};

const swaggerSpec = swaggerJSDoc(options);

// Function to setup Swagger UI
export const setupSwagger = (app: Express): void => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

import express, { Request, Response, NextFunction } from "express"; // Correctly importing express and types

import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import classRoutes from "./routes/classRoutes";
import mongoose from "mongoose";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Gym Management API",
      version: "1.0.0",
      description: "API for managing gym classes and bookings",
      contact: {
        name: "API Support",
        email: "support@gym.com",
      },
      servers: [{ url: "http://localhost:3000" }],
    },
  },
  apis: ["./src/routes/*.ts"], // Path to the API docs (adjust as needed)
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware and routes
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use("/api/auth", authRoutes);
app.use("/api/class", classRoutes);

// mongoose
//   .connect(process.env.MONGO_URI!)
//   .then(() => console.log("MongoDB connected"))
//   .catch((error) => console.log("MongoDB connection error:", error));

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log("MongoDB connected");
    // Start the server here instead of in server.ts
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });

export default app;

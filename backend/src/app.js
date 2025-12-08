import express from "express";
import morgan from "morgan";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

// Support multiple origins for production
const getAllowedOrigins = () => {
  const origins = [];
  
  // Add CLIENT_ORIGIN if set
  if (process.env.CLIENT_ORIGIN) {
    origins.push(process.env.CLIENT_ORIGIN);
  }
  
  // Add localhost for development
  if (process.env.NODE_ENV !== "production") {
    origins.push("http://localhost:5173", "http://localhost:3000");
  }
  
  // Allow all origins in development, specific in production
  if (process.env.NODE_ENV === "production") {
    return origins.length > 0 ? origins : false;
  }
  
  return origins.length > 0 ? origins : true;
};

app.use(
  cors({
    origin: getAllowedOrigins(),
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;


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
  
  // Add CLIENT_ORIGIN if set (supports comma-separated multiple origins)
  if (process.env.CLIENT_ORIGIN) {
    const clientOrigins = process.env.CLIENT_ORIGIN.split(",").map(origin => origin.trim());
    origins.push(...clientOrigins);
  }
  
  // Add localhost for development
  if (process.env.NODE_ENV !== "production") {
    origins.push("http://localhost:5173", "http://localhost:3000");
  }
  
  // Log allowed origins in production for debugging
  if (process.env.NODE_ENV === "production") {
    console.log("🌐 Allowed CORS origins:", origins.length > 0 ? origins : "NONE SET - CORS will fail!");
    if (origins.length === 0) {
      console.error("❌ WARNING: CLIENT_ORIGIN not set in production! CORS will block all requests.");
    }
    return origins.length > 0 ? origins : false;
  }
  
  return origins.length > 0 ? origins : true;
};

// CORS configuration with dynamic origin validation
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = getAllowedOrigins();
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      return callback(null, true);
    }
    
    // In development, allow all origins
    if (process.env.NODE_ENV !== "production") {
      return callback(null, true);
    }
    
    // In production, check against allowed origins
    if (Array.isArray(allowedOrigins) && allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`❌ CORS blocked origin: ${origin}`);
      console.error(`   Allowed origins: ${JSON.stringify(allowedOrigins)}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Debug endpoint to check CORS configuration (only in development)
if (process.env.NODE_ENV !== "production") {
  app.get("/api/debug/cors", (req, res) => {
    res.json({
      allowedOrigins: getAllowedOrigins(),
      clientOrigin: process.env.CLIENT_ORIGIN,
      nodeEnv: process.env.NODE_ENV,
      requestOrigin: req.headers.origin,
    });
  });
}

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;


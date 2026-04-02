import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });

const PORT = Number(process.env.PORT) || 5000;
const projectRoot = path.join(__dirname, "..");

app.use(express.json({ limit: "50mb" })); // Increase limit to 50MB
app.use(cookieParser());

// Security headers BEFORE CORS (Development-friendly)
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  // Don't set COEP in development - allows Cloudinary images
  if (process.env.NODE_ENV === "production") {
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  }
  next();
});

// CORS Configuration with proper headers for Google Sign-In
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { error: err.stack }),
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(projectRoot, "../Frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(projectRoot, "../Frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log("server is running on port:" + PORT);
  connectDB();
});

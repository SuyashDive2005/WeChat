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
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

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

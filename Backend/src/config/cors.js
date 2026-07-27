import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../../.env") });

const fallbackOrigins = ["http://localhost:3000", "http://localhost:5173"];

const configuredOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(",")
  : [];

export const corsOrigin = [...configuredOrigins, ...fallbackOrigins].filter(
  Boolean,
);

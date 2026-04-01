import { prisma } from "./prisma.js";

export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("MySQL connected via Prisma");
  } catch (error) {
    console.log("MySQL connection error:", error);
    process.exit(1);
  }
};

import { PrismaNeon } from "@prisma/adapter-neon";
import pkg from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();
const {PrismaClient} = pkg;
const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("Database was connected via Prisma");
  } catch (err) {
    console.error(`Database connection error: ${err}`);
  }
};

const disconnectDB = async () => {
  await prisma.$disconnect();
  console.log("Database was disconnected successfully");
};

export { prisma, disconnectDB, connectDB };

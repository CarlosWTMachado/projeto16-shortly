import dotenv from "dotenv";
dotenv.config();

export const aplicationPort = process.env.PORT;
export const databaseUrl = process.env.DATABASE_URL;
export const jwtSecret = process.env.JWT_SECRET;
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { authRoute, userRoute } from "./routes";
import { connectDB } from "./config/mongo";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB()

interface AppError extends Error {
  statusCode?: number;
}

app.get("/", (req, res) => {
  res.send("App is running!");
});

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ success: false, statusCode, message });
});

export default app;

import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import userRoutes from "./router/userRoutes.js";
import authRoutes from "./router/authRoutes.js";
import morgan from "morgan";
import { errorHandler } from "./utils/errorHandler.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.disable("x-powered-by");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);


app.use(errorHandler);

export default app;

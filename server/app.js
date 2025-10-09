import cors from "cosr";
import dotenv from "dotenv";
import express from "express";
import { Router } from "express";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.disable("x-powerd-by");

if(process.env.NODE_ENV === "development"){
  app.use(morgan('div'))
}

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
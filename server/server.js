import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { connect } from "./database/connection.js";
import router from "./router/route.js";

dotenv.config();

const app = express();

// Middlewares

app.use(express.json());
app.use(cors());
// app.use(morgan('tiny'))

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.disable("x-powerd-by");

app.get("/", (req, res) => {
  res.status(201).json("GET home request");
});

const port = process.env.PORT;

// Routes (small app no need to seperate)
app.use("/api/v1", router)


// Only Connect if there is a valid database

connect()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`Server working on http://localhost:${port}`);
      });
    } catch (err) {
      console.log("Cannot connect to server");
    }
  })
  .catch((err) => {
    console.log("No database connection", err.message);
  });

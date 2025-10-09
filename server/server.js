import { connect } from "./database/connection.js";
import app from "./app.js";

app.get("/", (req, res) => {
  res.status(201).json("GET home request");
});

const port = process.env.PORT;

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

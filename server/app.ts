import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { errror_handler } from "./common/handlers";

const app = express();
app.use(cors({ origin: "*" }));
const port = 3000;
app.use(bodyParser.json());

//api route inception
app.use("/api", require("./api"));

//common error handler
app.use(errror_handler);
app.listen(port, () => {
  console.log(`To-Do List Manager app listening at http://localhost:${port}`);
});

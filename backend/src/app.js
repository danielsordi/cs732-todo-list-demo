
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

app.use(cors());
app.use(express.json());
// app.use(express.static("public"));

import routes from "./routes/routes.js";
app.use("/", routes);

await mongoose.connect(process.env.DB_URL);

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => console.log(`Server is up and runnig on port ${PORT}!`));

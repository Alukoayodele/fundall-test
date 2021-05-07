import express from "express";
import dotenv from "dotenv";
import mysql from "mysql2";
import sequelize from "./database/connection.js";
import passport from "passport";
import path from "path";
import cors from "cors";
import { router as AuthModule } from "./routes/auth.route";
import { router as ExpenseModule } from "./routes/expenses.route";
import { router as IncomeModule } from "./routes/income.route";
import { router as UserModule } from "./routes/user.route";

dotenv.config();

// console.log(stage)
const app = express();

app.options("*", cors());
app.use(cors());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.get("/", (req, res) => {
  res.json({ message: `You hit mini-project home route` });
});
app.use("/api/v1/", AuthModule);
app.use("/api/v1/", ExpenseModule);
app.use("/api/v1/", IncomeModule);
app.use("/api/v1/", UserModule);

app.all("*", (req, res) => {
  res.status(404).json({ message: "Route not found!" });
});

export default app;

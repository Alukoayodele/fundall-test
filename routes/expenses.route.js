import express from "express";
import {
  ExpensesController,
  AllExpensesController,
  AllExpensesControllerThisMonth,
} from "../controllers/majors/expenses.controller";
import UserUtils from "../controllers/middleware/user";
const { ValidateUser } = UserUtils;
export const router = express.Router();

router.post("/createExpenses", ValidateUser, ExpensesController);
router.get("/allExpenses", ValidateUser, AllExpensesController);
router.get(
  "/allExpensesThisMonth",
  ValidateUser,
  AllExpensesControllerThisMonth
);

import express from "express";
import {
  IncomeController,
  AllIncomeController,
  AllIncomeControllerThisMonth,
} from "../controllers/majors/income.controller";
import UserUtils from "../controllers/middleware/user";
const { ValidateUser } = UserUtils;
export const router = express.Router();

router.post("/createIncome", ValidateUser, IncomeController);
router.get("/allIncome", ValidateUser, AllIncomeController);
router.get("/allIncomeThisMonth", ValidateUser, AllIncomeControllerThisMonth);

import { Sequelize } from "sequelize";
import moment from "moment";
import Expense from "../../models/Expense";
import dotenv from "dotenv";
dotenv.config();
import { validateExpenses } from "../../validators/expenses.validator";
const sequelize = new Sequelize("mysql::memory:");

export const ExpensesController = async (req, res) => {
  try {
    let { error, value } = await validateExpenses(req.body);
    if (error) {
      console.log(error);
      return res
        .status(400)
        .json({ message: error.details[0].message, data: error.details });
    }
    const expense = await Expense.create({
      ...value,
      ownerId: req.decoded.id,
    });
    return res.status(201).json({ message: "Expense recorded!", expense });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const AllExpensesController = async (req, res) => {
  try {
    const allExpense = await Expense.findAll({
      where: { ownerId: req.decoded.id },
    });
    if (allExpense.length == 0) {
      return res.status(400).json({ message: "No Expenses yet", allExpense });
    } else {
      return res.status(200).json({ message: "Expenses Fetched", allExpense });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
export const AllExpensesControllerThisMonth = async (req, res) => {
  try {
    const dateAndYear = moment(new Date()).format("MM");

    const allExpenseThisMonth = await Expense.findAll({
      where: {
        ownerId: req.decoded.id,
        $and: sequelize.where(
          sequelize.fn("Month", sequelize.col("createdAt")),
          dateAndYear
        ),
      },
    });
    if (allExpenseThisMonth.length == 0) {
      return res
        .status(400)
        .json({ message: "No Expenses this month yet", allExpenseThisMonth });
    } else {
      return res
        .status(200)
        .json({
          message: "Expenses for this month Fetched",
          allExpenseThisMonth,
        });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

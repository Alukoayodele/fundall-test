import { Sequelize } from "sequelize";
import moment from "moment";
import Income from "../../models/Income";
import dotenv from "dotenv";
dotenv.config();
import { validateIncomes } from "../../validators/incomes.validator";
const sequelize = new Sequelize("mysql::memory:");
export const IncomeController = async (req, res) => {
  try {
    let { error, value } = await validateIncomes(req.body);
    if (error) {
      console.log(error);
      return res
        .status(400)
        .json({ message: error.details[0].message, data: error.details });
    }
    const income = await Income.create({
      ...value,
      ownerId: req.decoded.id,
    });
    return res.status(201).json({ message: "Income recorded!!", income });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const AllIncomeController = async (req, res) => {
  try {
    const allIncome = await Income.findAll({
      where: { ownerId: req.decoded.id },
    });
    if (allIncome.length == 0) {
      return res.status(400).json({ message: "No Expenses yet", allIncome });
    } else {
      return res.status(200).json({ message: "Expenses Fetched", allIncome });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const AllIncomeControllerThisMonth = async (req, res) => {
  try {
    const dateAndYear = moment(new Date()).format("MM");

    const allIncomeThisMonth = await Income.findAll({
      where: {
        ownerId: req.decoded.id,
        $and: sequelize.where(
          sequelize.fn("Month", sequelize.col("createdAt")),
          dateAndYear
        ),
      },
    });
    if (allIncomeThisMonth.length == 0) {
      return res
        .status(400)
        .json({ message: "No Income yet", allIncomeThisMonth });
    } else {
      return res
        .status(200)
        .json({ message: "Income for this month Fetched", allIncomeThisMonth });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

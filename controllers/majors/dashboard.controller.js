import { Sequelize } from "sequelize";
import Expense from "../../models/Expense";
import User from "../../models/User";
import Income from "../../models/Income";
import Upload from "../../models/Upload";
import dotenv from "dotenv";
const sequelize = new Sequelize("mysql::memory:");
export const DashboardController = async (req, res) => {
  try {
    const userId = req.decoded.id;
    const userDetails = await User.findOne({
      attributes: {
        exclude: ["password"],
      },
      where: { id: userId },
      include: [
        {
          model: Expense,
          as: "expense",
          required: false,
          attributes: ["amount", "description"],
        },
        {
          model: Income,
          as: "income",
          required: false,
          attributes: ["amount", "description"],
        },
      ],
    });
    return res
      .status(200)
      .json({ message: "User details fetched", userDetails });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

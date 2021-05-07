import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../database/connection";
import User from "./User";

const Expense = sequelize.define("Expense", {
  id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  description: {
    type: DataTypes.STRING(35),
  },
  amount: {
    type: DataTypes.NUMBER,
  },
  ownerId: {
    type: DataTypes.INTEGER(11),
    allowNull: true,
    references: {
      model: "User",
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
});

Expense.associate = (models) => {
  Expense.belongsTo(models.User, {
    foreignKey: {
      name: "ownerId",
      allowNull: false,
    },
    as: "expense",
  });
};
export default Expense;

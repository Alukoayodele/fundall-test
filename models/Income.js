import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../database/connection";
import User from "./User";

const Income = sequelize.define("Income", {
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

Income.associate = (models) => {
  Income.belongsTo(models.User, {
    foreignKey: {
      name: "ownerId",
      allowNull: false,
    },
    as: "income",
  });
};
export default Income;

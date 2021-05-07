import { Sequelize, DataTypes } from "sequelize";
import bcrypt from "bcryptjs";
import sequelize from "../database/connection";
import Upload from "./Upload";
import Expense from "./Expense";
import Income from "./Income";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING(35),
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING(35),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(35),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  avatarId: {
    type: DataTypes.INTEGER(11),
    allowNull: true,
    references: {
      model: "Upload",
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
});

User.beforeCreate((user) => {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
});

User.hasMany(Expense, {
  foreignKey: {
    name: "ownerId",
    allowNull: false,
  },
  as: "expense",
});
User.hasMany(Income, {
  foreignKey: {
    name: "ownerId",
    allowNull: false,
  },
  as: "income",
});

export default User;

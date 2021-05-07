import User from "../../models/User";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import {
  validateRegistration,
  validateLoginData,
} from "../../validators/auth.validator";
import JWT from "jsonwebtoken";
dotenv.config();
let { AuthSecretKey } = process.env;

export const RegistrationController = async (req, res) => {
  try {
    let { error, value } = await validateRegistration(req.body);
    if (error) {
      console.log(error);
      return res
        .status(400)
        .json({ message: error.details[0].message, data: error.details });
    }
    console.log("value", value);
    let [user, created] = await User.findOrCreate({
      where: { email: value.email },
      defaults: value,
    });
    console.log(created, user);
    if (!created)
      return res
        .status(403)
        .json({ message: "Account already exist, login instead" });
    let { email, phone, id } = user;
    let token = await JWT.sign({ email, id, phone }, AuthSecretKey, {
      issuer: "fundall",
      expiresIn: "7d",
    });
    return res
      .status(201)
      .json({ message: "Registration Successful", token: `Bearer ${token}` });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const LoginController = async (req, res) => {
  try {
    let { error, value } = await validateLoginData(req.body);
    if (error) {
      return res
        .status(400)
        .json({ message: error.details[0].message, data: error.details });
    }
    let { email, password } = value;
    const user = await User.findOne({ where: { email } });
    if (user == null) {
      return res.status(404).json({ message: "User not found" });
    } else {
      let { email, id, phone } = user;
      let pwMatched = await bcrypt.compare(password, user.password);
      if (!pwMatched)
        return res.status(401).json({ message: "Incorrect Password" });
      let token = await JWT.sign({ email, id, phone }, AuthSecretKey, {
        issuer: "fundall",
        expiresIn: "7d",
      });
      return res
        .status(201)
        .json({ message: "Login Successful", token: `Bearer ${token}` });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

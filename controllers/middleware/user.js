import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const UserUtils = {
  ValidateUser: (req, res, next) => {
    const { authorization } = req.headers;
    let result;
    if (authorization && authorization.length > 0) {
      const token = authorization.split(" ")[1];
      const options = {
        issuer: "fundall",
        expiresIn: "7d",
      };
      try {
        result = jwt.verify(token, process.env.AuthSecretKey, options);
        req.decoded = result;
        next();
      } catch (err) {
        res.status(400).json({ message: "Bad token, expired or invalid" });
      }
    } else {
      res.status(401).json({
        message: "Bad request, authorisation token is required",
      });
    }
  },
};

export default UserUtils;

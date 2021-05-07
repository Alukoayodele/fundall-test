require("dotenv").config();

module.exports = {
  development: {
    username: "root",
    password: "AYOkunnumi@009",
    database: "fundallMiniProject",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    use_env_varable: "JAWSDB_URL",
    dialect: "mysql",
  },
  subQuery: false,
  distinct: true,
};

import Sequelize from "sequelize";
let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL, {
    dialect: "mysql",
    protocol: "mysql",
    operatorsAliases: false,
  });
} else {
  sequelize = new Sequelize("fundallMiniProject", "root", "AYOkunnumi@009", {
    host: "127.0.0.1",
    dialect: "mysql",
    operatorsAliases: false,
  });
}

export default sequelize;
// global.sequelize = sequelize

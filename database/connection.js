import Sequelize from "sequelize";
const sequelize = new Sequelize('fundallMiniProject', 'root','AYOkunnumi@009', {host: '127.0.0.1', dialect: 'mysql', operatorsAliases: false});
export default sequelize;
// global.sequelize = sequelize
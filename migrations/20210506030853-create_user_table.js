'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  return queryInterface.createTable("users", {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
  },
  firstName: {
     type: Sequelize.STRING(35),
     allowNull: false,
  },
  lastName: {
     type: Sequelize.STRING(35),
     allowNull: false,
  },
  email: {
     type: Sequelize.STRING(35),
     allowNull: false,
     unique:true
  },
  password: {
      type: Sequelize.STRING(100),
      allowNull: false,
      validate: {
          notEmpty: true,
      },
  },
  phone: {
      type: Sequelize.STRING(100),
      allowNull: false,
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
   })
  },

  down: async (queryInterface, Sequelize) => {
   return queryInterface.dropTable('users');
  }
};

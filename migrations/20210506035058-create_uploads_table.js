'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("uploads", {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    uploadURL: {
       type: Sequelize.STRING(35),
      
    },
    userId: Sequelize.INTEGER(11),
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
     })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('uploads');
  }
};

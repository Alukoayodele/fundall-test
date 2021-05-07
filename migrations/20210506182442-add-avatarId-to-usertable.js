"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("users", "avatarId", {
      type: Sequelize.INTEGER,
      references: { model: "uploads", key: "id" },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("users", "avatarId");
  },
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Books', 'publication_year', {
      type: Sequelize.INTEGER, // Assuming 'title' column type is STRING
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // You can define a down migration to revert the changes if needed
  },
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Publishers', 'publisherId', 'id');
  },

  down: async (queryInterface, Sequelize) => {
    // If needed, define a down migration to revert the column name change
    await queryInterface.renameColumn('Publishers', 'id', 'publisherId');
  },
};

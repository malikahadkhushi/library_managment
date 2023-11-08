'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Publishers', 'createdAt', {
      type: Sequelize.DATE,
    });
    await queryInterface.addColumn('Publishers', 'updatedAt', {
      type: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Publishers', 'createdAt');
    await queryInterface.removeColumn('publishers', 'updatedAt');
  },
};

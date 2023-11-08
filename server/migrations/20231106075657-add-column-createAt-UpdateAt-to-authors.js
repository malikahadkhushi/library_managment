'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Authors', 'createdAt', {
      type: Sequelize.DATE,
    });
    await queryInterface.addColumn('Authors', 'updatedAt', {
      type: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Authors', 'createdAt');
    await queryInterface.removeColumn('Authors', 'updatedAt');
  },
};

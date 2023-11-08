'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Books', 'publisher', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Publishers',
        key: 'publisherId',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE', // Add this line to set the cascade delete behavior
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Books', 'publisher', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Publishers',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'NO ACTION', // Restore the original onDelete behavior if needed
    });
  },
};

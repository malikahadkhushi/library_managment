'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add index on publisher column
    await queryInterface.addIndex('Books', ['publisher']);

    // Add index on Author Column
    await queryInterface.addIndex('Books', ['author']);

    // Add index on genre column
    await queryInterface.addIndex('Books', ['genre']);
    
    //Add index on publication_year column
    await queryInterface.addIndex('Books', ['publication_year']);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove index on authorId column
    await queryInterface.removeIndex('Books', ['authorId']);

    // Remove index on genreId column
    await queryInterface.removeIndex('Books', ['genreId']);
  },
};

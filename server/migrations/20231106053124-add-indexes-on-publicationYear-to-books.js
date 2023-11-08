'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
    
    //Add index on publication_year column
    await queryInterface.addIndex('Books', ['publication_year']);
  },

  down: async (queryInterface, Sequelize) => {
 

    // Remove index on genreId column
    await queryInterface.removeIndex('Books', ['publication_year']);
  },
};

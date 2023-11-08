'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Genres', {
      genreId: {
        type: Sequelize.UUID,
        defaultValue:Sequelize.literal('gen_random_uuid()'),
        allowNull:false,
        primaryKey:true
      },
      name: {
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Genres');
  }
};
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Authors', {
      authorId: {
        type: Sequelize.UUID,
        defaultValue:Sequelize.literal('gen_random_uuid()'),
        allowNull:false,
        primaryKey:true
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false
      },
      birth_date: {
        type: Sequelize.DATE,
        allowNull:false

      },
      country: {
        type: Sequelize.STRING,
        allowNull:false

      },
      biography: {
        type: Sequelize.TEXT,
        allowNull:false

      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Authors');
  }
};
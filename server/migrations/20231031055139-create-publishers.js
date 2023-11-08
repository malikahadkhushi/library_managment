'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Publishers', {
    
      publisherId: {
        type: Sequelize.UUID,
        primaryKey:true,
        allowNull:false,
        defaultValue:Sequelize.literal('gen_random_uuid()')
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false
      },
      genre_speciality: {
        type: Sequelize.UUID,
        allowNull:false,
        references:{
          model:'Genres',
          key:'genreId'
        }
      },
      founded_date: {
        type: Sequelize.DATE,
        allowNull:false
      },
      city: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      country: {
        type: Sequelize.STRING,
        allowNull:false,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Publishers');
  }
};
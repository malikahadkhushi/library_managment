'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Books', {
      bookId: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('gen_random_uuid()'), // Generates a UUID
        allowNull: false,
        unique: true, // Makes it unique
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      author: {
        type: Sequelize.UUID,
        allowNull: false,

        references: {
          model: 'Authors', // Name of the referenced table (update with your Authors model name)
          key: 'authorId', // Name of the primary key in the referenced table (update with your primary key name)
        },
      },
      publisher: {
        type: Sequelize.UUID,
        allowNull: false,

        references: {
          model: 'Publishers', // Name of the referenced table (update with your Publishers model name)
          key: 'publisherId', // Name of the primary key in the referenced table (update with your primary key name)
        },
      },
      genre: {
        type: Sequelize.UUID,
        allowNull: false,

        references: {
          model: 'Genres', // Name of the referenced table (update with your Genres model name)
          key: 'genreId', // Name of the primary key in the referenced table (update with your primary key name)
        },
      },
      publication_year: {
        type: Sequelize.INTEGER,
        allowNull: false,

      },
      ISBN: {
        type: Sequelize.STRING,
        allowNull: false,

      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Books');
  },
};

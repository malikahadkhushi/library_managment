// 20231030123456-insert-genres.js

'use strict';
const fs = require('fs');
const csv = require('csv-parser');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [];

    // Read data from the CSV file and insert it into the "Genres" table
    fs.createReadStream('./genres.csv')
      .pipe(csv())
      .on('data', (row) => {
        data.push({
          name: row.name, // Replace with the CSV column name for genre name
        });
      })
      .on('end', async () => {
        await queryInterface.bulkInsert('Genres', data);
      });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Genres', null, {});
  },
};

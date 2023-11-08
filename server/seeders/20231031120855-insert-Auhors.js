// 20231030123456-insert-genres.js

'use strict';
const fs = require('fs');
const csv = require('csv-parser');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return new Promise((resolve,reject)=>{

  try {
      
    const data = [];

    // Read data from the CSV file and insert it into the "Genres" table
    fs.createReadStream('./seeders/author.csv')
      .pipe(csv())
      .on('data', (row) => {
        data.push({
          name: row.name,
          birth_date: row.birth_date,
          country: row.country,
          biography: row.biography,
        });
      })
      .on('end', async () => {
        await queryInterface.bulkInsert('Authors', data);
      });
  } catch (error) {
    console.error(error);
  }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Authors', null, {});
  },
};

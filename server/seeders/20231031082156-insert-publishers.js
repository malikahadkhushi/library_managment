// seed-publishers.js
const fs = require('fs');
const csv = require('csv-parser');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return new Promise(async (resolve, reject) => {
      const data = [];

      // Import the Genres model (adjust the path accordingly)
      const Genres = require('../models/genres');

      // Read data from the CSV file and insert it into the "Publishers" table
      fs.createReadStream('./seeders/publisher.csv')
        .pipe(csv())
        .on('data', async (row) => {
          console.log('Seeder started'); // Add this line

          try {
            const genreQuery = `SELECT "genreId" FROM "Genres" WHERE name = :genreName`;

            const [matchingGenre] = await queryInterface.sequelize.query(genreQuery, {
              replacements: { genreName: row.genre_speciality },
              type: queryInterface.sequelize.QueryTypes.SELECT,
            });
          console.log('first',matchingGenre)
            if (matchingGenre) {

              // Insert the data into the "Publishers" table
              data.push({
                name: row.name,
                genre_speciality: matchingGenre.genreId,
                 // Use the retrieved genreId
                founded_date: row.founded_date,
                city: row.city,
                country: row.country,
              });
            // setTimeout(()=>{
            //   console.log(data)
            // },5000)
            } else {
              console.log(`No matching genre found for genre_speciality: ${row.genre_speciality}`);
            }
          } catch (error) {
            console.error(`Error processing data: ${error.message}`);
          }
        })
        .on('end', async () => {
          const t = await queryInterface.sequelize.transaction();

          try {
            await queryInterface.bulkInsert('Publishers', data, {
              transaction: t,
              returning: ['publisherId'],
            });
          
            // Commit the transaction
            await t.commit();
              } catch (error) {
            console.error(`Error inserting data into "Publishers" table: ${error.message}`);
          }
        });
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Define the down logic to remove the seeded data if needed
    await queryInterface.bulkDelete('Publishers', null, {});
  },
};

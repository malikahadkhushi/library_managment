"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return new Promise(async (resolve, reject) => {
      const fs = require("fs");
      const csv = require("csv-parser");
      const { Books, Publishers, Authors, Genres } = require("../models");

      const csvFilePath = "./seeders/books.csv";
      const chunkSize = 50000;
      let totalRecords = 0;
      let recordsProcessed = 0;
      let chunk = [];
      let recordsToInsert = [];
      const uniqueGenres = [];
      const uniquePublishers = [];
      const uniqueAuthors = [];

      const processChunk = async () => {
        const authorIdMap = new Map();
        const publisherIdMap = new Map();
        const genreIdMap = new Map();

        const chunkTemp = [...chunk];
        chunk = [];

        for (const row of chunkTemp) {
          if (!uniqueGenres.includes(row.genre)) {
            uniqueGenres.push(row.genre);
          }
          if (!uniquePublishers.includes(row.publisher)) {
            uniquePublishers.push(row.publisher);
          }
          if (!uniqueAuthors.includes(row.author)) {
            uniqueAuthors.push(row.author);
          }
        }

        // console.log(uniqueGenres);
        // console.log(uniqueAuthors);
        // console.log(uniquePublishers);

        try {
          // add authors, publishers and genres in promise.All
          
          
          Promise.all([
            Authors.findAll({
              attributes: ["authorId", "name"],
              where: { name: uniqueAuthors },
            }),
            Publishers.findAll({
              attributes: ["publisherId", "name"],
              where: { name: uniquePublishers },
            }),
            Genres.findAll({
              attributes: ["genreId", "name"],
              where: { name: uniqueGenres },
            })
          ])
            .then(([authors, publishers, genres]) => {
              authors.forEach((author) => {
                authorIdMap.set(author.name, author.authorId);
              });
          
              if (!publishers.length) {
                console.log("No matching publishers found in the database for:", uniquePublishers);
              } else {
                publishers.forEach((publisher) => {
                  publisherIdMap.set(publisher.name, publisher.publisherId);
                });
              }
          
              if (!publisherIdMap.size) {
                console.log("No publishers added to publisherIdMap.");
              } else {
                console.log("Publisher Map:", publisherIdMap);
              }
          
              genres.forEach((genre) => {
                genreIdMap.set(genre.name, genre.genreId);
              });
          
              // Now you can proceed to insert records using the maps and recordsToInsert
              for (const row of chunkTemp) {
                console.log(authorIdMap);
                const bookData = {
                  title: row.title,
                  genre: genreIdMap.get(row.genre),
                  author: authorIdMap.get(row.author),
                  publisher: publisherIdMap.get(row.publisher),
                  publication_year: row.publication_year,
                  ISBN: row.isbn,
                };
                recordsToInsert.push(bookData);
              }
    
              // Now, you can insert the records in chunks
              console.log("Records to Insert:", recordsToInsert.length);
    
              if (recordsToInsert.length) {  queryInterface.bulkInsert("Books", recordsToInsert); }



            })
            .catch((error) => {
              console.error("Error fetching data from the database:", error);
              reject(error);
            });
          
          // console.log("Genre",genreIdMap);


         

          recordsToInsert = [];
          authorIdMap.clear();
          publisherIdMap.clear();
          genreIdMap.clear();
          uniqueAuthors.length = 0;
          uniquePublishers.length = 0;
          uniqueGenres.length = 0;

        } catch (error) {
          console.error("Error inserting books:", error);
          reject(error);
        }

        recordsProcessed += chunkTemp.length;

        if (recordsProcessed < totalRecords) {
          console.log(`Processed ${recordsProcessed} records out of ${totalRecords}`);
        }
      };

      fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on("data", async (row) => {
          chunk.push(row);
          totalRecords++;

          // console.log(totalRecords);

          if (chunk.length >= chunkSize) {
            await processChunk();
          }
        })
        .on("end", async () => {
          if (chunk.length > 0) {
            await processChunk();
          }

          console.log(
            `Total Records are: ${totalRecords} and inserted in table: ${recordsProcessed}`
          );
          console.log("CSV parsing completed.");
          console.log("Books data imported successfully.");
          resolve();
        })
        .on("error", (error) => {
          console.error("Error reading CSV file:", error);
          reject(error);
        });
    });
  },

  down: async (queryInterface, Sequelize) => {
    return new Promise(async (resolve, reject) => {
      const { Books } = require("../models");

      try {
        await Books.destroy({ where: {} });

        console.log("Removed all records from the Books table.");
        resolve();
      } catch (error) {
        console.error("Error deleting Books records:", error);
        reject(error);
      }
    });
  },
};

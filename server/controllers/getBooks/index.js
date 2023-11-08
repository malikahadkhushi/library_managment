const {
    booksOfNPublihser,
    booksOfNAuthor,
    booksOfNGenre,
    booksPublishedAfterYear,
    booksPublishedBeforYear,
    getBooksInSpeciality,
    findBookByAuthor,
    findBookByGenre,
    findBooksByPublisher,
    findBooksByText


} = require("../../services/Books");


// 1. Return the number of books of n publishers in sorted order
exports.getBooksByNpublishers = async (req, res) => {
    let publishersArray = req.body.publishers;
    try {
        if (publishersArray.length) {
            const publisherCounts = await booksOfNPublihser(publishersArray);

            if (publisherCounts) {
                res.status(200).send(publisherCounts);
            } else {
                res.status(401).send("Not Result Found");
            }
        } else {
            res.status(400).send("Please Enter Data");
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to retrieve records." });
    }
};

// 2. Return the number of books of n Authors in sorted order
exports.getBooksByNAuthors = async (req, res) => {
    const authorsArray = req.body.authors;

    try {
        if (authorsArray.length) {
            const authorCounts = await booksOfNAuthor(authorsArray);

            if (authorCounts) {
                res.status(200).send(authorCounts);
            } else {
                res.status(401).send("Not Result Found");
            }
        } else {
            res.status(400).send("Please Enter Data");
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Failed to retrieve records." });
    }
};

// 3. Return the number of books of n Genres in sorted order
exports.getBooksByNGenres = async (req, res) => {
    const genresArray = req.body.genres;

    try {
        if (genresArray.length) {
            const genreCounts = await booksOfNGenre(genresArray);
            res.status(200).json(genreCounts);
        } else {
            res.status(400).send("Please Enter Data");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to retrieve records." });
    }
};

// 4. Return books published after xyz year
exports.getBooksPublishedAfterYear = async (req, res) => {
    const year = parseInt(req.body.year, 10); // Replace with your desired year
    const page = parseInt(req.params.page, 10) || 1; // Page number
    const limit = 50; // Number of records per page

    try {
        const offset = (page - 1) * limit;

        const { count, rows } = await booksPublishedAfterYear({
            limit,
            offset,
            year,
        });

        let remainingRecords = count - page * limit;
        if (remainingRecords < 0) {
            remainingRecords = 0;
        }

        let result = {
            totalRecords: count,
            remainingRecords: remainingRecords,
            records: rows,
        };

        if (!rows.length) {
            res.status(401).send("Books not Found");
        } else {
            res.status(200).send(result);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to retrieve records.", error });
    }
};

// 5. Return books published Before xyz year
exports.getBooksPublishedBeforeYear = async (req, res) => {
    const year = parseInt(req.body.year, 10); // Replace with your desired year
    const page = parseInt(req.params.page, 10) || 1; // Page number
    const limit = 50; // Number of records per page

    try {
        const offset = (page - 1) * limit;
        const { count, rows } = await booksPublishedBeforYear({
            limit,
            offset,
            year,
        });

        let remainingRecords = count - page * limit;

        if (remainingRecords < 0) {
            remainingRecords = 0;
        }

        let result = {
            totalRecords: count,
            remainingRecords: remainingRecords,
            records: rows,
        };

        if (!rows.length) {
            res.status(401).send("Publishers  not Found");
        } else {
            res.status(200).send(result);
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve records." });
    }
};

// 6. Return the number books of the n publishers that have published in their own genre_speciality

exports.getBooksByNPublishersInOwnGenre = async (req, res) => {
    const publisherIds = req.body.publishers; // Number of publishers

    try {
        const result = await getBooksInSpeciality(publisherIds);

        if (result) {
            res.status(200).send(result);
        } else {
            res.status(401).send("Not Record Found");
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to retrieve records." });
    }
};

// 7. Return the books of an author
exports.getBooksByAuthor = async (req, res) => {
    const authorId = req.body.id; // Author name
    const page = parseInt(req.params.page, 10) || 1; // Page number
    const limit = 50; // Number of records per page

    try {
        const offset = (page - 1) * limit;

        const { count, rows } = await findBookByAuthor({ authorId, limit, offset });

        let remainingRecords = count - page * limit;
        if (remainingRecords < 0) {
            remainingRecords = 0;
        }

        let result = {
            totalRecords: count,
            remainingRecords: remainingRecords,
            records: rows,
        };

        if (!rows.length) {
            res.status(401).send("Books Not Found");
        } else {
            res.status(200).send(result);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to retrieve records." });
    }
};

// 8. Return the books of an Genre
exports.getBooksByGenre = async (req, res) => {
    const genreId = req.body.id; // Genre Id
    const page = parseInt(req.params.page, 10) || 1; // Page number
    const limit = 50; // Number of records per page

    try {
        const offset = (page - 1) * limit;

        const { count, rows } = await findBookByGenre({ genreId, limit, offset });

        let remainingRecords = count - page * limit;

        if (remainingRecords < 0) {
            remainingRecords = 0;
        }

        let result = {
            totalRecords: count,
            remainingRecords: remainingRecords,
            records: rows,
        };

        if (!rows.length) {
            res.status(401).send("Books Not Found");
        } else {
            res.status(200).send(result);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to retrieve records." });
    }
};


// 9. Return the books of an publisher
exports.getBooksByPublisher = async (req, res) => {

    const publisherId = req.body.id; // publisher Id
    const page = parseInt(req.params.page, 10) || 1; // Page number
    const limit = 50; // Number of records per page

    try {
        const offset = (page - 1) * limit;

        const { count, rows } = await findBooksByPublisher({ publisherId, offset, limit });

        let remainingRecords = count - (page * limit);
        if (remainingRecords < 0) {
            remainingRecords = 0;
        }

        let result = {
            totalRecords: count,
            remainingRecords: remainingRecords,
            records: rows

        }


        if (!rows.length) {
            res.status(401).send('Books Not Found');
        }
        else {

            res.status(200).send(result);

        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to retrieve records.' });
    }
};

// 10. Return the books by text
exports.getBooksByText = async (req, res) => {

    const searchText = req.body.title; // Text to search
    const page = parseInt(req.params.page, 10) || 1; // Page number
    const limit = 50; // Number of records per page

    try {
        const offset = (page - 1) * limit;

        const { count, rows } = await findBooksByText({ searchText, limit, offset });

        let remainingRecords = count - page * limit;

        if (remainingRecords < 0) {
            remainingRecords = 0;
        }

        let result = {
            totalRecords: count,
            remainingRecords: remainingRecords,
            records: rows,
        };

        if (!rows.length) {
            res.status(401).send("Books  not Found");
        } else {
            res.status(200).send(result);
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve records." });
    }
};


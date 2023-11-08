const { Books, Publishers } = require('../../models');
const sequelize = require('sequelize');


// insertBook

exports.insertBook = (bookInfo) => {

    return Books.create(bookInfo);
}

// Count of N Publishers
exports.booksOfNPublihser = (publisherIds) => {
    console.log(publisherIds)
    return Books.findAll({
        attributes: [
            "publisher",
            [sequelize.fn('COUNT', sequelize.col('publisher')), 'count'],
        ],
        where: {
            publisher: publisherIds,
        },
        group: ['publisher'],

    });

}

// Count of N Authors
exports.booksOfNAuthor = (authorIds) => {


    

    return Books.findAndCountAll({
        attributes: [
            [sequelize.literal('author'), 'author'],
            [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
        ],
        where: {
            author: authorIds,
        },
        group: 'author',
    });

}

exports.booksOfNGenre = (genreIds) => {

    return Books.count({
        attributes: [
            [sequelize.literal('genre'), 'genre'],
            [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
        ],
        where: {
            genre: genreIds,
        },
        group: 'genre',
    });

}

exports.booksPublishedAfterYear = (obj) => {

   


    return Books.findAndCountAll({
        where: {
            publication_year: { [sequelize.Op.gt]: obj.year },
        },
        attributes:['title'],
        limit: obj.limit,
        offset: obj.offset,
    });

}

exports.booksPublishedBeforYear = (info) => {
    return Books.findAndCountAll({
        where: {
            publication_year: { [sequelize.Op.lt]: info.year },
        },
        limit: info.limit,
        offset: info.offset,
        order: [['publication_year', 'ASC']], // Replace with your desired sorting column
    });

}

exports.getBooksInSpeciality = (publisherIds) => {

    return Books.findAll({
        attributes: [
            [sequelize.fn('COUNT', sequelize.col('Books.id')), 'count'],
            [sequelize.col('Publisher.id'), 'Publisher.id'],
            [sequelize.col('Publisher.genre_speciality'), 'Publisher.genre_speciality'],

        ],
        include: {
            model: Publishers,
            as: 'Publisher',
            where: {
                id: publisherIds,
            },
            attributes: ['id', 'name']
        },
        group: ['Publisher.id', 'Publisher.genre_speciality'],
    });

}

exports.findBookByAuthor = (info) => {

    return Books.findAndCountAll({
        where: {
            author: info.authorId
        },
        limit: info.limit,
        offset: info.offset,
        order: [['publication_year', 'ASC']], // Replace with your desired sorting column
    });

}


exports.findBookByGenre = (info) => {

    return Books.findAndCountAll({
        where: {
            genre: info.genreId
        },
        limit: info.limit,
        offset: info.offset,
        order: [['publication_year', 'ASC']], // Replace with your desired sorting column
    });
}

exports.findBooksByPublisher = (info) => {

    return Books.findAndCountAll({
        where: {
            publisher: info.publisherId
        },
        limit: info.limit,
        offset: info.offset,
        order: [['publication_year', 'ASC']], // Replace with your desired sorting column
    });

}


exports.findBooksByText = (info) => {

    return Books.findAndCountAll({
        where: {
            title: { [sequelize.Op.iLike]: `%${info.searchText}%` }, // Case-insensitive search
        },
        limit: info.limit,
        offset: info.offset,
        order: [["title", "ASC"]], // Replace with your desired sorting column
    });
}

// check Book

exports.checkBook = (id) => {

    return Books.findOne({ where: { id: id } });

}

exports.deletebook = (bookId) => {
    return Books.destroy({ where: { id: bookId } });
}

exports.updatebook = (obj) => {

    return Books.update(
        obj.book,
        {
            where: { id: obj.bookId },
        }
    );
}

exports.allBooks = (obj) => {

    return Books.findAll({
        limit: obj.limit,
        offset: obj.offset
    });
}
exports.getbook = (id) => {

    return Books.findOne({ where: { id: id } });

}
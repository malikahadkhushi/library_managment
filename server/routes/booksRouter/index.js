const express = require("express");

const isAdmin = require('../../middlewares/userStatus')


const {
    deleteBook,
    createBook,
    updateBook,
    getAllBooks,
    getSingleBook
} = require("../../controllers/booksCrud");


const {
    getBooksByNpublishers,
    getBooksByNAuthors,
    getBooksByNGenres,
    getBooksPublishedAfterYear,
    getBooksPublishedBeforeYear,
    getBooksByNPublishersInOwnGenre,
    getBooksByAuthor,
    getBooksByGenre,
    getBooksByPublisher,
    getBooksByText
} = require('../../controllers/getBooks');


require("../../passport-jwt");

const passport = require("passport");
const router = express.Router();

router.post('/createbook', passport.authenticate('jwt', { session: false }), isAdmin, createBook);
router.delete("/deleteBook/:id", passport.authenticate('jwt', { session: false }), isAdmin, deleteBook);
router.put('/updatebook/:id', passport.authenticate('jwt', { session: false }), isAdmin, updateBook);
router.get('/getallbooks/:page', passport.authenticate('jwt', { session: false }), getAllBooks);
router.get('/getSingleBook/:id', passport.authenticate('jwt', { session: false }), getSingleBook);

router.post("/getBooksByNPublishers", passport.authenticate('jwt', { session: false }), getBooksByNpublishers);
router.post("/getBooksByNAuthors", passport.authenticate('jwt', { session: false }), getBooksByNAuthors);
router.post("/getBooksByNGenres", passport.authenticate('jwt', { session: false }), getBooksByNGenres);

router.post("/getBooksPublishedAfterYear/:page", passport.authenticate('jwt', { session: false }), getBooksPublishedAfterYear);
router.post("/getBooksPublishedBeforeYear/:page", passport.authenticate('jwt', { session: false }), getBooksPublishedBeforeYear);
router.post("/getBooksByNPublishersInOwnGenre", passport.authenticate('jwt', { session: false }), getBooksByNPublishersInOwnGenre);

router.post("/getBooksByAuthor/:page", passport.authenticate('jwt', { session: false }), passport.authenticate('jwt', { session: false }), getBooksByAuthor);
router.post("/getBooksByPublisher/:page", passport.authenticate('jwt', { session: false }), getBooksByPublisher);
router.post("/getBooksByGenre/:page", passport.authenticate('jwt', { session: false }), getBooksByGenre);

router.post("/getBooksByText/:text", passport.authenticate('jwt', { session: false }), getBooksByText);

module.exports = router;

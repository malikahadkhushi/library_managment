const express = require("express");

const {deleteBook ,createBook , updateBook } = require("../../controllers/booksCrud");

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

router.post('/createbook',createBook);
router.delete("/deleteBook/:id", deleteBook);
router.put('/updatebook/:id',updateBook);

router.post("/getBooksByNPublishers", getBooksByNpublishers);
router.post("/getBooksByNAuthors", getBooksByNAuthors);
router.post("/getBooksByNGenres", getBooksByNGenres);

router.post("/getBooksPublishedAfterYear/:page", getBooksPublishedAfterYear);
router.post("/getBooksPublishedBeforeYear/:page", getBooksPublishedBeforeYear);
router.post("/getBooksByNPublishersInOwnGenre", getBooksByNPublishersInOwnGenre);

router.post("/getBooksByAuthor/:page", passport.authenticate('jwt',{session:false}) ,  getBooksByAuthor);
router.post("/getBooksByPublisher/:page", getBooksByPublisher);
router.post("/getBooksByGenre/:page", getBooksByGenre);

router.post("/getBooksByText/:text", getBooksByText);

module.exports = router;

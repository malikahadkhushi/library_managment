const express = require('express');
require('../../passport-jwt')
const passport = require('passport');
const { getAuthorsByText } = require('../../controllers/getAuthor');

const {
    createAuthor,
    updateAuthor,
    deleteAuthor,
    getAllAuthors,
    getSingleAutor
} = require('../../controllers/auhtorsCrud');

const router = express.Router();

router.post('/author/:page', getAuthorsByText);
router.post('/createauthor', createAuthor);
router.put('/updateauthor/:id', updateAuthor);
router.delete('/deleteauthor/:id', deleteAuthor);
router.get('/getallauthors/:page', getAllAuthors);
router.get('/getauthor/:id', getSingleAutor);

module.exports = router;
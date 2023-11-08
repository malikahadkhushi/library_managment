const express = require('express');

const {
    createGenre,
    updateGenre,
    deleteGenre,
    getAllGenres,
    getSingleGenre
} = require('../../controllers/genreCrud');

const router = express.Router();

router.post('/creategenre', createGenre);
router.put('/updategenre/:id', updateGenre);
router.delete('/deletegenre/:id', deleteGenre);
router.get('/getallgenre/:page', getAllGenres);
router.get('/getsinglegenre/:id', getSingleGenre);


module.exports = router;
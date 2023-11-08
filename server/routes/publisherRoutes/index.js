const express = require('express');
require('../../passport-jwt')
const passport = require('passport');
const getPublsiherByText = require('../../controllers/getPublisher');

const {
    createPublisher,
    updatePublisher,
    deletePublisher,
    getAllPublishers,
    getSinglePublisher
} = require('../../controllers/publisherCrud');

const router = express.Router();

router.delete('/publisher/:id', deletePublisher);
router.post('/publishers/:page', getPublsiherByText);
router.post('/createpublisher', createPublisher);
router.put('/updatepublisher/:id', updatePublisher);
router.delete('/deletepublisher/:id', deletePublisher)
router.get('/allpublishers/:page', getAllPublishers);
router.get('/getpublisher/:id', getSinglePublisher);

module.exports = router;
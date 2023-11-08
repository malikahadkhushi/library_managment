const express = require('express');
require('../../passport-jwt')
const passport = require('passport');
const deletePublisher = require('../../controllers/deletePublisher');
const getPublsiherByText = require('../../controllers/getPublisher');
const router = express.Router();

router.delete('/publisher/:id', deletePublisher);
router.post('/publishers/:page',getPublsiherByText);

module.exports = router;
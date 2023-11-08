const express = require('express');
require('../../passport-jwt')
const passport = require('passport');
const {getAuthorsByText} = require('../../controllers/getAuthor');
const router = express.Router();

router.post('/author/:page', getAuthorsByText);

module.exports = router;
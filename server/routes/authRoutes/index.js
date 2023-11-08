const express = require('express');
const {login , signUp , logOut} = require('../../controllers/Auth');
const signUpValidationMiddleware = require('../../middlewares/signUpMiddleware');
const logInMiddleware = require('../../middlewares/logInMiddleware');
const router = express.Router();


router.post('/signup',signUpValidationMiddleware,signUp)
router.post('/login',logInMiddleware,login);
router.post('/logout',logOut)



module.exports = router;
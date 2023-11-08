const express = require("express");
const bcrypt = require('bcrypt')
const passport = require("../../passport-jwt");
const { tokenGenerator } = require("../../token/tokenGenerator");
const { findUser, registerUser, checkUser } = require('../../services/Auth');

const app = express();
app.use(express.json());
app.use(passport.initialize()); //initialize passport

// LogIn Controller
exports.login = async (req, resp) => {
    try {

        let User = req.body;
        let find = await findUser(User);
        let match = await bcrypt.compare(User.password, find.dataValues.password);
        
        if (match) {
            let token = tokenGenerator(find.dataValues);
            console.log("Token", token)
            resp.status(201).send({ find, token });
        }
        
    } catch (error) {
        
        resp.status(500).send("Server Error");
        
    }
};

// // SignUp Controller
exports.signUp = async (req, resp) => {

    try {
        let user = await req.body;
        let find = await checkUser(user);

        console.log("User", find);
        
        if (find.length != 0) {
            resp.status(409).send("User Already Exist");
        } else {

            user.password = await bcrypt.hash(req.body.password, 10);
            let check = await registerUser(user);
            console.log("Check",check);
            if(check){
                resp.status(201).send("User Created Successfully");
            }
            else
            {
                resp.status(500).send("User Created UnSuccessfull");
            }

        }

    } catch (error) {
        resp.status(500).send({ message: "Server Error", error: error.message });
    }
};

exports.logOut = (req , res )=>{
   
        const token = req.headers.authorization.split(' ')[1];
        if (token) {
          res.json({ message: 'Token revoked successfully',token });
        } else {
          res.status(400).json({ message: 'No token provided' });
        }
}





const jwt = require('jsonwebtoken');
const tokenGenerator = (user)=>{

   let token =  jwt.sign(user,'SECRET_KEY',{expiresIn:'5m'});
  
   return token;
}
module.exports = {tokenGenerator};
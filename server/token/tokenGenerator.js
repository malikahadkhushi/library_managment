const jwt = require('jsonwebtoken');
const tokenGenerator = (user)=>{

   let token =  jwt.sign({id:user.id , role:user.role} ,'SECRET_KEY');
  
   return token;
}
module.exports = {tokenGenerator};
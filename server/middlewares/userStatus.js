const isAdmin = (req, res, next) => {
console.log(req)
    let role = req.user.role;
    console.log("Role",role)
    if (role.toLowerCase() === 'admin') {
      next();
    } else {
      res.status(403).send('Restricted Route');
    }
  };
  
  module.exports = isAdmin;
  
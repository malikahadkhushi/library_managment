
const signUpValidationMiddleware = (req, res, next) => {

  const { name, email, password, mobile, role } = req.body;

  
  if (!name.trim() || !email.trim() || !password.trim() || !mobile.trim() || !role.trim()) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // checking the length of the password
  if (password.trim().length < 8) {
    return res.status(400).json({ error: "Password must be at least 8 characters long" });
  }

  //  checking the format of the email
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!email.trim().match(emailRegex)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  // checking the format of the mobile number and the length of the mobile number
  const mobileRegex = /^\d+$/;
  if (!mobile.trim().match(mobileRegex) && mobile.trim().length == 11) {
    return res.status(400).json({ error: "Invalid mobile number format" });
  }


  next();
};

module.exports = signUpValidationMiddleware;

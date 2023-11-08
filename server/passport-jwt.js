const passport = require('passport');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const secretKey = "SECRET_KEY";
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey,
};

const { Users } = require('./models'); // Replace with the path to your User model.

const jwtStrategy = new JwtStrategy(options, async (jwt_payload, done) => {
  try {

    const user = await Users.findOne({ id: jwt_payload.sub });
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
});

passport.use(jwtStrategy);

module.exports = passport;

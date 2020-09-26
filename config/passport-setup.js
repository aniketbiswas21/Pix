const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const User = require("../models/User");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      // options for the google strategy
      callbackURL: "/api/auth/google/redirect",
      clientID: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_PASSWORD,
    },
    async (accessToken, refreshToken, profile, done) => {
      // check if user already exists
      const user = await User.findOne({ email: profile._json.email });
      if (user) {
        console.log("user exists as \n" + user);
        return done(null, user);
      } else {
        console.log(profile);
        let newUser = new User({
          email: profile._json.email,
          name: profile.displayName,
          photo: profile.picture,
          verified: true,
          password: profile.id,
          isGoogleUser: true,
        });
        newUser = await newUser.save();
        console.log("new user created \n" + newUser);
        return done(null, newUser);
      }
    }
  )
);

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userController = require("../controller/userController");

// { email: "email@gmail.com", password: "user123" }
const localLogin = new LocalStrategy(
  {
    usernameField: "email", // "username" if want username instead of email
    passwordField: "password", // don't even need this because default
  },
  (email, password, done) => {
    const user = userController.getUserByEmailIdAndPassword(email, password);
    return user
      ? done(null, user)
      : done(null, false, {
        message: "Your login details are not valid. Please try again",
      });
  }
);

// Create the user session
passport.serializeUser(function (user, done) {
  done(null, user.id); // create session with the user id
});

passport.deserializeUser(function (id, done) {
  const user = userController.getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

module.exports = passport.use(localLogin);

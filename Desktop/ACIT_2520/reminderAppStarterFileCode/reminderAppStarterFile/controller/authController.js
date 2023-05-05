const passport = require("../middleware/passport");
const userModel = require("../database").userModel;

const authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: (req, res, next) => {
    // implement
    passport.authenticate("local", {
      successRedirect: "/reminders",
      failureRedirect: "/login",
    })(req, res, next);
  },

  registerSubmit: (req, res) => {
    // implement
    const dbLength = userModel.getLength();
    const user = {
      id: dbLength + 1,
      email: req.body.email,
      password: req.body.password,
      reminders: [],
    };
    userModel.create(user);
    res.redirect("/login");
  },

  logoutSubmit: (req, res) => {
    req.logout((err) => {
      if (err) {
        console.log(err);
      }
      res.redirect("/login");
    });
  }
};

module.exports = authController;

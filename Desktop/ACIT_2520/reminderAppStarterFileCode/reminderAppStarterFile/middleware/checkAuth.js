module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
  },
  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next(); // if not authenticated, go login/register page
    }
    res.redirect("/reminders"); // here we can redirect to the home page
  },
};

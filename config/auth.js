const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error_msg", "Please log in first!");
  res.redirect("/users/login");
};
export default {
  ensureAuthenticated,
};

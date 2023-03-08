export const redirectLogin = (req, res, next) => {
  debugger;
  console.log("file: midleware.js:4 ~ redirectLogin ~ req.user:", req.user);
  if (req.user && req.user.role === "admin") {
    req.flash("success_msg", "Login successfull");
    res.redirect("/players");
  } else {
    req.flash("success_msg", "Login successfull");
    res.redirect("/");
  }
};
export const requireRole = (req, res, next) => {
  console.log(req.user);
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    req.flash("error_msg", "Access denied, your role is not admin");
    res.redirect("/");
  }
};
export const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error_msg", "Please log in first!");
  res.redirect("/users/login");
};

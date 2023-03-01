import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import passport from "passport";
const index = (req, res) => {
  res.render("register");
};
const regist = (req, res, next) => {
  const { username, password } = req.body;
  let errors = [];
  if (!username || !password) {
    errors.push({ msg: "Please enter all fields" });
  }
  if (password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }
  if (errors.length > 0) {
    res.render("register", {
      errors,
      username,
      password,
      isLogin: req.session.passport === undefined ? false : true,
    });
  } else {
    User.findOne({ username: username }).then((user) => {
      if (user) {
        errors.push({ msg: "Username already exists" });
        res.render("register", {
          errors,
          username,
          password,
          isLogin: req.session.passport === undefined ? false : true,
        });
      } else {
        const newUser = new User({
          username,
          password,
        });
        //Hash password
        bcrypt.hash(newUser.password, 10, function (err, hash) {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              res.redirect("/users/login");
            })
            .catch(next);
        });
      }
    });
  }
};
const loginPage = (req, res) => {
  res.render("login");
};
const signIn = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/users/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
};
const dashboard = (req, res, next) => {
  console.log("file: user.js:63 ~ dashboard ~ req.user:", req.user);

  res.render("dashboard", {
    isLogin: req.session.passport === undefined ? false : true,
  });
  res.redirect("/players");
};
const signOut = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success_msg", "You are logged out");
    res.redirect("/users/login");
  });
};
const formEdit = (req, res, next) => {
  const userId = req.session.passport.user.id;
  console.log(userId);
  User.findById(userId)
    .then((user) => {
      console.log(user);
      res.render("profile", {
        title: "The detail of User",
        user: user,
        isLogin: req.session.passport === undefined ? false : true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
const editUser = (req, res, next) => {
  var data = {
    name: req.body.name,
    YOB: req.body.yob,
  };
  User.updateOne({ _id: req.session.passport.user.id }, data)
    .then(() => {
      req.flash("success_msg", "Updated successfully!");
      res.redirect(`/users/edit`);
    })
    .catch((err) => {
      req.flash("error_msg", err);
      res.redirect(`/users/edit`);
    });
};
const listUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.render("accounts", {
        title: "The list of Users",
        users: users,
        isLogin: req.session.passport === undefined ? false : true,
      });
    })
    .catch(next);
};
export default {
  index,
  regist,
  formEdit,
  editUser,
  signIn,
  signOut,
  loginPage,
  dashboard,
  listUsers,
};

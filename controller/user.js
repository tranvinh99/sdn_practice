import { User } from "../models/index.js";
import bcryp from "bcrypt";
const index = (req, res) => {
  res.render("register");
};
const regist = (req, res, next) => {
  const { username, password } = req.body;
  let errors = [];
  if (!username || !password) {
    errors.push({ msg: "Please fill all fields" });
  }
  if (password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }
  if (errors.length > 0) {
    res.render("register", {
      errors,
      username,
      password,
    });
  } else {
    User.findOne({ username: username }).then((user) => {
      if (user) {
        errors.push({ msg: "Username already exists" });
        res.render("register", {
          errors,
          username,
          password,
        });
      } else {
        const newUser = new User({
          username,
          password,
        });
        bcryp.hash(newUser.password, 10, (err, hash) => {
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
export default { index, regist };

import express from "express";
const UserRoute = express.Router();

UserRoute.get("/", (req, res) => {
  res.render("register");
});
export default UserRoute;

import express from "express";
import { UserController } from "../controller/index.js";
import { redirectLogin, ensureAuthenticated } from "../config/midleware.js";
const userRoute = express.Router();

userRoute.route("/").get(UserController.index).post(UserController.regist);
userRoute
  .route("/login")
  .get(UserController.loginPage)
  .post(UserController.signIn);
userRoute.route("/logout").get(UserController.signOut);
userRoute
  .route("/dashboard")
  .get(ensureAuthenticated, redirectLogin, UserController.dashboard);
userRoute
  .route("/edit")
  .get(ensureAuthenticated, UserController.formEdit)
  .post(ensureAuthenticated, UserController.editUser);
export default userRoute;

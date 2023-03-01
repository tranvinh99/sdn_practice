import UserRoute from "./user.js";
import NationRoute from "./nation.js";
import PlayerRoute from "./player.js";
export { UserRoute, NationRoute, PlayerRoute };

import express from "express";
import { PlayerController, UserController } from "../controller/index.js";
import { ensureAuthenticated, requireRole } from "../config/midleware.js";
const route = express.Router();

route.get("/", PlayerController.homePage);
route.get(
  "/accounts",
  ensureAuthenticated,
  requireRole,
  UserController.listUsers
);

export default route;

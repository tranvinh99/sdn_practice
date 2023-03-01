import express from "express";
import { NationController } from "../controller/index.js";
import { ensureAuthenticated, requireRole } from "../config/midleware.js";
const NationRoute = express.Router();

NationRoute.route("/")
  .get(ensureAuthenticated, requireRole, NationController.index)
  .post(ensureAuthenticated, requireRole, NationController.createNation);
NationRoute.route("/edit/:nationId")
  .get(ensureAuthenticated, requireRole, NationController.navNationDetail)
  .post(ensureAuthenticated, requireRole, NationController.editNation);
NationRoute.route("/delete/:nationId").get(
  ensureAuthenticated,
  requireRole,
  NationController.deleteNation
);

export default NationRoute;

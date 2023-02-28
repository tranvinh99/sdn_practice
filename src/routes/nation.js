import express from "express";
import { NationController } from "../controller/index.js";
const NationRoute = express.Router();

NationRoute.route("/")
  .get(NationController.index)
  .post(NationController.createNation);
NationRoute.route("/edit/:nationId")
  .get(NationController.navNationDetail)
  .post(NationController.editNation);
NationRoute.route("/delete/:nationId").get(NationController.deleteNation);

export default NationRoute;

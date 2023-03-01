import { PlayerController } from "../controller/index.js";
import multer, { diskStorage } from "multer";
import express from "express";
import { ensureAuthenticated, requireRole } from "../config/midleware.js";
const PlayerRoute = express.Router();
const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/Players/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error("Only image files are allowed!"));
    }
    cb(null, true);
  },
});

const upload = multer({ storage: storage });

PlayerRoute.route("/")
  .get(ensureAuthenticated, requireRole, PlayerController.index)
  .post(
    ensureAuthenticated,
    requireRole,
    upload.single("file"),
    PlayerController.createPlayer
  );
PlayerRoute.route("/edit/:playerId")
  .get(ensureAuthenticated, requireRole, PlayerController.formEdit)
  .post(
    ensureAuthenticated,
    requireRole,
    upload.single("file"),
    PlayerController.editPlayer
  );
PlayerRoute.route("/delete/:playerId").get(
  ensureAuthenticated,
  requireRole,
  PlayerController.deletePlayer
);
PlayerRoute.route("/:playerId").get(PlayerController.playerDetail);
export default PlayerRoute;

import { PlayerController } from "../controller/index.js";
import multer, { diskStorage } from "multer";
import express from "express";
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
  .get(PlayerController.index)
  .post(upload.single("file"), PlayerController.createPlayer);
PlayerRoute.route("/edit/:playerId")
  .get(PlayerController.formEdit)
  .post(upload.single("file"), PlayerController.editPlayer);
PlayerRoute.route("/delete/:playerId").get(PlayerController.deletePlayer);

export default PlayerRoute;

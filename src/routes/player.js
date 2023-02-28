// import express from "express";
// import { PlayerController } from "../controller/index.js";
// import multer from "multer";
// const PlayerRoute = express.Router();
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/images/Players/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
//   fileFilter: function (req, file, cb) {
//     if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
//       return cb(new Error("Only image files are allowed!"));
//     }
//     cb(null, true);
//   },
// });
// const upload = multer({ storage: storage });

// PlayerRoute.route("/")
//   .get(PlayerController.index)
//   .post(upload.single("file"), PlayerController.createPlayer);

// export default PlayerRoute;

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

export default PlayerRoute;

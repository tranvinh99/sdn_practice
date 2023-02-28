import { Player, Nation } from "../models/index.js";
let clubData = [
  { id: "1", name: "Arsenal" },
  { id: "2", name: "Manchester United" },
  { id: "3", name: "Chelsea" },
  { id: "4", name: "Manchester City" },
  { id: "5", name: "PSG" },
  { id: "6", name: "Inter Milan" },
  { id: "7", name: "Real Madrid" },
  { id: "8", name: "Barcelona" },
];
let postitionData = [
  { id: "1", name: "Goalkeeper" },
  { id: "2", name: "Centre Back" },
  { id: "3", name: "Left Back" },
  { id: "4", name: "Right Back" },
  { id: "5", name: "Sweeper" },
  { id: "6", name: "Center Midfielder" },
  { id: "7", name: "Left Midfielder" },
  { id: "8", name: "Right Midfielder" },
  { id: "9", name: " Attacker " },
];
const home = (req, res, next) => {
  Nation.find({})
    .then((nations) => {
      Player.find({})
        .populate("nation", ["name", "description"])
        .then((players) => {
          res.render("index", {
            title: "The list of Players",
            players: players,
            positionList: postitionData,
            clubList: clubData,
            nationsList: nations,
          });
        })
        .catch((err) => {
          console.log(err);
          next();
        });
    })
    .catch((err) => {
      console.log(err);
      next();
    });
};
const index = (req, res, next) => {
  console.log(req.session);
  Nation.find({})
    .then((nations) => {
      Player.find({})
        .populate("nation", ["name", "description"])
        .then((players) => {
          res.render("playerSite", {
            title: "The list of Players",
            players: players,
            positionList: postitionData,
            clubList: clubData,
            nationsList: nations,
          });
        })
        .catch((err) => {
          console.log(err);
          next();
        });
    })
    .catch((err) => {
      console.log(err);
      next();
    });
};
const createPlayer = (req, res, next) => {
  Nation.find({})
    .then((nations) => {
      if (nations.length === 0) {
        req.flash(
          "error_msg",
          "Please input data of nations in Database first!!!"
        );
        return res.redirect("/players");
      }
    })
    .catch((err) => {
      req.flash("error_msg", "Server Error");
      return res.redirect("/players");
    });
  var data = {
    name: req.body.name,
    image:
      req.file === undefined ? "" : `/images/Players/${req.file.originalname}`,
    career: req.body.career,
    position: req.body.position,
    goals: req.body.goals,
    nation: req.body.nation,
    isCaptain: req.body.isCaptain === undefined ? false : true,
  };
  console.log("data: ", data);
  const player = new Players(data);
  Player.find({ name: player.name }).then((playerCheck) => {
    if (playerCheck.length > 0) {
      req.flash("error_msg", "Duplicate player name!");
      res.redirect("/players");
    } else {
      console.log(player);
      player
        .save()
        .then(() => res.redirect("/players"))
        .catch(next);
    }
  });
};
const findPlayerById = (req, res, next) => {
  const playerId = req.params.playerId;
  Player.findById(playerId)
    .then((player) => {
      res.render("player-detail", {
        title: player.name,
        player,
      });
    })
    .catch(next);
};
export default {
  index,
  createPlayer,
};

import { Player, Nation, User } from "../models/index.js";

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

const index = (req, res, next) => {
  console.log(req.session);
  Nation.find({})
    .then((nations) => {
      Player.find({})
        .populate("nation", ["name", "description"])
        .then((players) => {
          res.render("players-site", {
            title: "The list of Players",
            players: players,
            positionList: postitionData,
            clubList: clubData,
            nationsList: nations,
            isLogin: req.session.passport === undefined ? false : true,
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
    isLogin: req.session.passport === undefined ? false : true,
  };
  debugger;
  console.log("data: ", data);
  const player = new Player(data);
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
const formEdit = (req, res, next) => {
  const playerId = req.params.playerId;
  Nation.find({})
    .then((nations) => {
      Player.findById(playerId)
        .then((player) => {
          res.render("editPlayer", {
            title: "Detail of player",
            player: player,
            positionList: postitionData,
            clubList: clubData,
            nationsList: nations,
            isLogin: req.session.passport === undefined ? false : true,
          });
        })
        .catch(next);
    })
    .catch(next);
};
const editPlayer = (req, res, next) => {
  var data;
  const { name, career, position, goals, nation, isCaptain } = req.body;
  if (!req.file) {
    data = {
      name,
      career,
      position,
      goals,
      nation,
      isCaptain: isCaptain === undefined ? false : true,
    };
  } else {
    data = {
      name: name,
      image: `/images/Players/${req.file.originalname}`,
      career: career,
      position: position,
      goals: goals,
      nation: nation,
      isCaptain: isCaptain === undefined ? false : true,
      isLogin: req.session.passport === undefined ? false : true,
    };
  }
  Player.updateOne({ _id: req.params.playerId }, data)
    .then(() => {
      res.redirect("/players");
    })
    .catch((err) => {
      console.log("error update: ", err);
      req.flash("error_msg", "Duplicate player name!");
      res.redirect(`/players/edit/${req.params.playerId}`);
    });
};
const playerDetail = (req, res, next) => {
  const playerId = req.params.playerId;
  console.log(playerId);
  Nation.find({})
    .then((nations) => {
      Player.findById(playerId)
        .populate("nation", "name")
        .then((player) => {
          console.log(player);
          res.render("playerDetail", {
            title: "The detail of Player",
            player: player,
            positionList: postitionData,
            clubList: clubData,
            nationsList: nations,
            isLogin: req.session.passport === undefined ? false : true,
          });
        })
        .catch(next);
    })
    .catch(next);
};
const deletePlayer = (req, res, next) => {
  Player.findByIdAndDelete({ _id: req.params.playerId })
    .then(() => res.redirect("/players"))
    .catch(next);
};
const homePage = (req, res, next) => {
  Nation.find({})
    .then((nations) => {
      Player.find({ isCaptain: true })
        .populate("nation", ["name", "description"])
        .then((players) => {
          res.render("index", {
            title: "The list of Players",
            players: players,
            positionList: postitionData,
            clubList: clubData,
            nationsList: nations,
            isLogin: req.session.passport === undefined ? false : true,
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
export default {
  index,
  createPlayer,
  formEdit,
  deletePlayer,
  editPlayer,
  homePage,
  playerDetail,
};

import { Nation, Player } from "../models/index.js";

const index = (req, res, next) => {
  return Nation.find({})
    .then((nations) => {
      res.render("nations-site", {
        title: "The list of Nations",
        nations: nations,
      });
    })
    .catch(next);
};
const createNation = (req, res, next) => {
  const nation = new Nation(req.body);
  Nation.find({ name: nation.name }).then((nationCheck) => {
    if (nationCheck.length > 0) {
      req.flash("error_msg", "Nation Exist!");
      res.redirect("/nations");
    } else {
      nation
        .save()
        .then(() => res.redirect("/nations"))
        .catch(next);
    }
  });
};

const navNationDetail = (req, res, next) => {
  const nationId = req.params.nationId;
  Nation.findById(nationId)
    .then((nation) => {
      res.render("edit-nation", {
        title: "The detail of Nation",
        nation: nation,
      });
    })
    .catch(next);
};
const editNation = (req, res, next) => {
  Nation.updateOne({ _id: req.params.nationId }, req.body)
    .then(() => {
      return res.redirect("/nations");
    })
    .catch((err) => {
      console.log("error update: ", err);
      req.flash("error_msg", "This nation is existed!");
      res.redirect(`/nations/edit/${req.params.nationId}`);
    });
};
const deleteNation = (req, res, next) => {
  Player.find({ nation: req.params.nationId })
    .populate("nation")
    .then((data) => {
      if (data.length > 0) {
        req.flash(
          "error_msg",
          `You can not delete this nation because it has already been connected with other players`
        );
        return res.redirect("/nations");
      } else {
        Nation.findByIdAndDelete({ _id: req.params.nationId })
          .then(() => res.redirect("/nations"))
          .catch(next);
      }
    })
    .catch(next);
};
export default {
  index,
  createNation,
  navNationDetail,
  deleteNation,
  editNation,
};

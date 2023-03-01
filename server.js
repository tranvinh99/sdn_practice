import express from "express";
import * as dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import connect from "./db/db.js";
import Route, { NationRoute, UserRoute, PlayerRoute } from "./routes/index.js";
import cors from "cors";
import bodyParser from "body-parser";
import flash from "connect-flash";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";
import passportLocal from "./config/passport.js";
passportLocal(passport);

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(express.static(__dirname + "/uploads"));

app.use(morgan("dev"));
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

const port = process.env.PORT ?? 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/users", UserRoute);
app.use("/nations", NationRoute);
app.use("/players", PlayerRoute);
app.use("/", Route);

app.listen(port, async (req, res) => {
  await connect();
  console.log("listening on port " + port);
});

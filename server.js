const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");


require("dotenv").config();

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3001;
const router = express.Router();
// Requiring our models for syncing

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/encontro";

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true
});

const db = {
  sql: require("./models/sequelize"),
  mongo: require("./models/mongoose")
};
passport.serializeUser((user, done) => {
  console.log("NOw");
  done(null, user);
});
passport.deserializeUser((user, done) => {
  console.log(user);
  db.sql.User.findOrCreate({where:{id:user.id}}).then(()=>{done(null,user)})
});
passport.use(require("./auth/googleconfig.js")(db));
passport.use(require("./auth/linkedinconfig.js")(db));



if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET }));

app.use(authRequired);

app.use(passport.initialize());
app.use(passport.session());

function authRequired(req, res, next) {
  if (!req.session.passport) {
    req.session.oauth2return = req.originalUrl;
    if(req.originalUrl==="/"||req.originalUrl==="/home"){
      return res.redirect("/login");
    }
  }
  next();
}

const routes = require("./routes")(router, db, passport);

app.use(routes);

db.sql.sequelize
  .sync({ force: process.env.NODE_ENV === "development" ? true : false })
  .then(() => {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });

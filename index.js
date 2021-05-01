const express = require("express");
const app = express();
const mongoose = require("mongoose");
const RiseOfRedSkull = require("./models/RiseOfRedSkull");
var cookieParser = require("cookie-parser");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(
  "Put a connection string here",
  {
    useNewUrlParser: true,
  },
  function (error) {
    if (error) {
      console.log("not connected to db");
      console.log(error);
    } else {
      console.log("connected to db");
    }
  }
);
mongoose.set("useFindAndModify", false);

let allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://jonathanrlange.github.io");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Credentials", true);
  next();
};
app.use(allowCrossDomain);

app.get("/", function (req, res) {
  RiseOfRedSkull.findOne(
    { campaignName: "JonsRORSCamp" },
    function (err, riseOfRedSkull) {
      if (err) {
        console.log(err);
        res.json({ message: "Error accesing database. Try again" });
      } else if (!riseOfRedSkull) {
        res.json({ message: "Wrong username" });
      } else {
        res.send(riseOfRedSkull);
      }
    }
  );
});

app.post("/rors", (req, res) => {
  const riseOfRedSkull = new RiseOfRedSkull({
    campaignName: req.body.campaignName,
    playerOne: {
      hero: "",
      techUpgrade: "",
      basicUpgrade: "",
      improved: false,
      rescuedAllies: "",
      hitPoints: "",
      obligationOne: false,
      obligationTwo: false,
      obligationThree: false,
      obligationFour: false,
    },
    playerTwo: {
      hero: "",
      techUpgrade: "",
      basicUpgrade: "",
      improved: false,
      rescuedAllies: "",
      hitPoints: "",
      obligationOne: false,
      obligationTwo: false,
      obligationThree: false,
      obligationFour: false,
    },
    playerThree: {
      hero: "",
      techUpgrade: "",
      basicUpgrade: "",
      improved: false,
      rescuedAllies: "",
      hitPoints: "",
      obligationOne: false,
      obligationTwo: false,
      obligationThree: false,
      obligationFour: false,
    },
    playerFour: {
      hero: "",
      techUpgrade: "",
      basicUpgrade: "",
      improved: false,
      rescuedAllies: "",
      hitPoints: "",
      obligationOne: false,
      obligationTwo: false,
      obligationThree: false,
      obligationFour: false,
    },
    laserRifle: false,
    energyShield: false,
    powerGauntlets: false,
    exoSuit: false,
    numOfDelayCounters: "",
    playerOneEngaged: false,
    playerTwoEngaged: false,
    playerThreeEngaged: false,
    playerFourEngaged: false,
    playerOneAllyRemoved: "",
    playerTwoAllyRemoved: "",
    playerThreeAllyRemoved: "",
    playerFourAllyRemoved: "",
  });
  riseOfRedSkull
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

app.post("/rorslogin", function (req, res) {
  RiseOfRedSkull.findOne(
    { campaignName: req.body.campaignName.trim() },
    function (err, riseOfRedSkull) {
      if (err) {
        console.log(err);
        res.json({ message: "Error accesing database. Try again" });
      } else if (!riseOfRedSkull) {
        res.json({ message: "Wrong username" });
      } else {
        res.send(riseOfRedSkull);
      }
    }
  );
});

app.post("/rorsupdate", function (req, res) {
  const { campaignName, ...newObj } = req.body;
  RiseOfRedSkull.findOneAndUpdate(
    { campaignName: req.body.campaignName.trim() },
    newObj,
    { new: true },
    function (err, riseOfRedSkull) {
      if (err) {
        console.log(err);
      } else {
        res.send(riseOfRedSkull);
      }
    }
  );
});

app.post("/rorsdelete", function (req, res) {
  const { campaignName, ...newObj } = req.body;
  RiseOfRedSkull.findOneAndDelete(
    { campaignName: req.body.campaignName.trim() },
    function (err, riseOfRedSkull) {
      if (err) {
        console.log(err);
      } else {
        console.log("Here");
        res.send(riseOfRedSkull);
      }
    }
  );
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`listening port ${port}...`));

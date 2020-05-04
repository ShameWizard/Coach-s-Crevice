let express = require("express");
let app = express();
let reloadMagic = require("./reload-magic.js");
let cookieParser = require("cookie-parser");

let mongodb = require("mongodb");
let MongoClient = mongodb.MongoClient;
let ObjectId = mongodb.ObjectId;
let sessions = {};
let sha1 = require("sha1");
let multer = require("multer");
let upload = multer({ dest: __dirname + "/uploads" });
reloadMagic(app);
app.use(cookieParser());
app.use("/", express.static("build")); // Needed for the HTML and JS files
app.use("/", express.static("public")); // Needed for local assets
let validator = require("email-validator");
let dbo = undefined;
let url =
  "mongodb+srv://shawski76:ham3st3r76@coachlineup-wrfdl.mongodb.net/test?retryWrites=true&w=majority";
MongoClient.connect(url, { useUnifiedTopology: true })
  .then(client => {
    dbo = client.db("coachlineup");
  })
  .catch(err => console.log(err));
let generateId = () => {
  return "" + Math.floor(Math.random() * 1000000000);
};
// Your endpoints go after this line
app.post("/eventcreated", upload.none(), async (req, res) => {
  console.log("request to /eventcreated endpoint", req.body);
  let date = req.body.date;
  let time = req.body.time;
  let location = req.body.location;
  let type = req.body.type;
  let opponent = req.body.opponent;
  let teamId = req.body.teamId;
  let eventCreatingEmail = req.body.userEmail;
  // let team = req.body.team

  try {
    const attemptedUser = await dbo
      .collection("users")
      .find({ userEmail: eventCreatingEmail });
    if (!attemptedUser) {
      return res.send(
        JSON.stringify({ success: false, message: "database error" })
      );
    }
    if (attemptedUser) {
      console.log("user database retrieved, inserting new event");
      await dbo.collection("users").updateOne(
        { userEmail: eventCreatingEmail },
        {
          $push: {
            createdEvents: {
              date: date,
              time: time,
              location: location,
              type: type,
              teamId: teamId,
              opponent: opponent,
              eventCreator: eventCreatingEmail
            }
          }
        }
      );
      return res.send(
        JSON.stringify({
          success: true,
          createdEvents: attemptedUser.createdEvents,
          userEmail: attemptedUser.userEmail
        })
      );
    }
  } catch (err) {
    console.log("/eventcreator error", err);
    res.send(JSON.stringify({ success: false, message: err }));
    return;
  }
});
app.post("/teamcreator", upload.single(), async (req, res) => {
  console.log("request to /teamcreator endpoint", req.body);
  let teamSport = req.body.teamSport;
  let teamCity = req.body.teamCity;
  let teamName = req.body.teamName;
  let teamAbb = req.body.teamAbb;
  let teamId = req.body.teamId;
  let teamLogo = req.file;
  let teamCreatingEmail = req.body.userEmail;
  try {
    const attemptedUser = await dbo
      .collection("users")
      .find({ userEmail: teamCreatingEmail });
    if (!attemptedUser) {
      return res.send(
        JSON.stringify({ success: false, message: "database error" })
      );
    }
    if (attemptedUser) {
      console.log("user team database retrieved, inserting new team");
      await dbo.collection("users").updateOne(
        { userEmail: teamCreatingEmail },
        {
          $push: {
            createdTeams: {
              teamSport: teamSport,
              teamCity: teamCity,
              teamName: teamName,
              teamAbb: teamAbb,
              teamId: teamId,
              teamLogo: teamLogo,
              teamCreator: teamCreatingEmail,
              createdPlayers: ""
            }
          }
        }
      );
      return res.send(
        JSON.stringify({ success: true, message: "Team Succesfully Created!" })
      );
    }
  } catch (err) {
    console.log("/playercreator error", err);
    res.send(JSON.stringify({ success: false, message: err }));
    return;
  }
});
app.post("/teammanager", upload.none(), async (req, res) => {
  console.log("request to /teammanager endpoint", req.body);
});
app.post("/playercreator", upload.single(), async (req, res) => {
  console.log("request to /playercreator endpoint", req.body);
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let number = req.body.number;
  let position = req.body.position;
  let sport = req.body.sport;
  let playerId = req.body.playerId;
  let playerImage = req.body.playerId;
  let playerCreatingEmail = req.body.userEmail;
  let teamId = req.body.teamId;
  try {
    const attemptedUser = await dbo
      .collection("users")
      .find({ userEmail: playerCreatingEmail });
    if (!attemptedUser) {
      return res.send(
        JSON.stringify({ success: false, message: "database error" })
      );
    }
    if (attemptedUser) {
      console.log("user player database retrieved, inserting new player");
      await dbo.collection("users").updateOne(
        { teamId: teamId },
        {
          $push: {
            createdPlayers: {
              firstName: firstName,
              lastName: lastName,
              number: number,
              position: position,
              sport: sport,
              playerId: playerId,
              playerImage: playerImage,
              playerCreator: playerCreatingEmail,
              teamId: teamId
            }
          }
        }
      );
      return res.send(JSON.stringify({ success: true }));
    }
  } catch (err) {
    console.log("/playercreator error", err);
    res.send(JSON.stringify({ success: false, message: err }));
    return;
  }
});
app.post("/signup", upload.none(), async (req, res) => {
  console.log("request to /signup endpoint");
  let enteredEmail = req.body.userEmail;
  let enteredPassword = req.body.password;
  let enteredUserId = req.body.userId;
  let displayName = req.body.displayName;
  try {
    const attemptedUser = await dbo
      .collection("users")
      .findOne({ userEmail: enteredEmail });
    if (attemptedUser) {
      return res.send(
        JSON.stringify({ success: false, message: "email already in use" })
      );
    }
    if (validator.validate(enteredEmail) === false) {
      return res.send(
        JSON.stringify({ success: false, message: "invalid email" })
      );
    }
    await dbo.collection("users").insertOne({
      displayName: displayName,
      userEmail: enteredEmail,
      password: sha1(enteredPassword),
      userId: enteredUserId,
      createdEvents: [],
      createdTeams: []
    });
    let sessionId = generateId();
    console.log("generated Id", sessionId);
    sessions[sessionId] = enteredEmail;
    res.send(JSON.stringify({ success: true }));
  } catch (err) {
    console.log("/signup error", err);
    res.send(JSON.stringify({ success: false }));
    return;
  }
});
app.post("/signin", upload.none(), async (req, res) => {
  console.log("request to /signin endpoint", req.body);
  let enteredEmail = req.body.userEmail;
  let enteredPassword = req.body.password;
  try {
    const attemptedUser = await dbo
      .collection("users")
      .findOne({ userEmail: enteredEmail });
    if (!attemptedUser) {
      return res.send(
        JSON.stringify({ success: false, message: "Email not found" })
      );
    }
    if (attemptedUser.password === sha1(enteredPassword)) {
      console.log("username and password match with database");
      let sessionId = generateId();
      res.cookie("sid", sessionId);
      sessions[sessionId] = enteredEmail;
      let updatedEvents = attemptedUser.createdEvents.map(event => {
        if (new Date(event.date).getTime() > new Date().getTime()) {
          return event;
        }
      });
      // await dbo.collection("users").updateOne(
      //   { userEmail: enteredEmail },
      //   {
      //     createdEvents: updatedEvents
      //   }
      // );
      return res.send(
        JSON.stringify({
          success: true,
          displayName: attemptedUser.displayName,
          userId: attemptedUser.userId,
          userEmail: attemptedUser.userEmail,
          createdEvents: attemptedUser.createdEvents,
          createdTeams: attemptedUser.createdTeams
        })
      );
    }
    res.send(JSON.stringify({ success: false, message: "password incorrect" }));
  } catch (err) {
    console.log("/signin error", err);
    res.send(JSON.stringify({ success: false, message: err }));
    return;
  }
});

app.post("/signout", (req, res) => {
  console.log("request to signout endpoint");
  const sessionId = req.cookies.sid;
  delete sessions[sessionId];
  res.send(JSON.stringify({ success: true }));
});
app.get("/session", async (req, res) => {
  console.log("request to /session endpoint");
  const sessionId = req.cookies.sid;
  const userEmail = sessions[sessionId];
  const attemptedUser = await dbo
    .collection("users")
    .findOne({ userEmail: userEmail });

  if (!attemptedUser) {
    return res.send(
      JSON.stringify({ success: false, message: "Email not found" })
    );
  }
  if (attemptedUser) {
    return res.send(
      JSON.stringify({
        success: true,
        userEmail: attemptedUser.userEmail,
        userId: attemptedUser.userId,
        createdEvents: attemptedUser.createdEvents,
        createdTeams: attemptedUser.createdTeams,
        displayName: attemptedUser.displayName
      })
    );
  }
  res.send(JSON.stringify({ success: false }));
  return;
});

app.all("/*", (req, res, next) => {
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});

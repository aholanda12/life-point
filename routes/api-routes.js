// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const parseBool = str => str === "true" || str === "1";

module.exports = function (app) {

  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // API call for posting a new journal entry
  app.post("/api/entry", (req, res) => {
    console.log(req.body);
    db.Journal.create({
      entry: req.body.data1.entry,
      date: req.body.data1.date,
      UserId: req.user.id
    })
      .then(data => {
        const journalId = data.dataValues.id;
        console.log(data);
        const gratefulC = db.Grateful.create({
          one: req.body.data3.one,
          two: req.body.data3.two,
          three: req.body.data3.three,
          four: req.body.data3.four,
          five: req.body.data3.five,
          JournalId: journalId
        });
        // .then(() => {
        //   res.redirect(307, "/api/home");
        // })
        // .catch(err => {
        //   res.status(401).json(err);
        // });
        const rememberC = db.Remember.create({
          one: req.body.data4.one,
          two: req.body.data4.two,
          three: req.body.data4.three,
          four: req.body.data4.four,
          five: req.body.data4.five,
          JournalId: journalId
        });
        // .then(() => {
        //   res.redirect(307, "/api/home");
        // })
        // .catch(err => {
        //   res.status(401).json(err);
        // });
        const moodC = db.Mood.create({
          mood: parseInt(req.body.data2.mood),
          medication: parseBool(req.body.data2.medication),
          hoursSleep: parseInt(req.body.data2.hoursSleep),
          minutesExercise: parseInt(req.body.data2.minutesExercise),
          minutesNapping: parseInt(req.body.data2.minutesNapping),
          servingsCaffiene: parseInt(req.body.data2.servingsCaffiene),
          servingsAlcohol: parseInt(req.body.data2.servingsAlcohol),
          hoursTV: parseInt(req.body.data2.hoursTV),
          showered: parseBool(req.body.data2.showered),
          brushedTeeth: parseBool(req.body.data2.brushedTeeth),
          selfCare: parseBool(req.body.data2.selfCare),
          minutesSocial: parseInt(req.body.data2.minutesSocial),
          headache: parseBool(req.body.data2.headache),
          nausea: parseBool(req.body.data2.nausea),
          exhaustion: parseBool(req.body.data2.exhaustion),
          insomnia: parseBool(req.body.data2.insomnia),
          appetite: parseInt(req.body.data2.appetite),
          menstruation: parseBool(req.body.data2.menstruation),
          JournalId: journalId
        });
        // .then(() => {
        //   res.redirect(307, "/api/home");
        // })
        // .catch(err => {
        //   res.status(401).json(err);
        // });
        Promise.all([gratefulC, rememberC, moodC])
          .then(data => {
            console.log(data);
            res.json({redirect: "/home"});
          })
          .catch(err => {
            res.status(401).json(err);
          });
      });
    // .then(() => {
    //   res.redirect(307, "/api/home");
    // })
    // .catch(err => {
    //   res.status(401).json(err);
    // });
    //
  });


  // API call for retrieving an old journal entry
  app.get("/api/entry/:id", (req, res) => {
    db.Journal.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Mood],
      include: [db.Grateful],
      include: [db.Remember],
      // include: [db.Affirmation],
    }).then(function (dbJournal) {
      res.json(dbJournal);
    });
  });

  app.get("/api/entrybydate/:date", (req, res) => {
    db.Journal.findOne({
      where: {
        date: req.params.date,
        UserId: req.user.id
      },
      // include: [db.Mood],
      // include: [db.Grateful],
      include: [db.Remember],
    }).then(function (dbJournal) {
      res.json(dbJournal);
    });
  });
  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      console.log(req.user.email);
      console.log(req.user.id);
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

};

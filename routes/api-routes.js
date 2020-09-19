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
    // console.log(req.body);
    // Creates the journal first
    db.Journal.create({
      entry: req.body.data1.entry,
      date: req.body.data1.date,
      UserId: req.user.id
    })
      .then(data => {
        const journalId = data.dataValues.id;
        // console.log(data);
        // Creates the grateful, remember, and mood data after the journal in order to use the id
        const gratefulC = db.Grateful.create({
          one: req.body.data3.one,
          two: req.body.data3.two,
          three: req.body.data3.three,
          four: req.body.data3.four,
          five: req.body.data3.five,
          JournalId: journalId
        });
        const rememberC = db.Remember.create({
          one: req.body.data4.one,
          two: req.body.data4.two,
          three: req.body.data4.three,
          four: req.body.data4.four,
          five: req.body.data4.five,
          JournalId: journalId
        });
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
        // Uses a promise to create the dependant data, then redirects to the homepage
        Promise.all([gratefulC, rememberC, moodC])
          .then(data => {
            console.log(data);
            res.json({ redirect: "/home" });
          })
          .catch(err => {
            res.status(401).json(err);
          });
      });
  });


  // API call for retrieving an old journal entry
  app.get("/api/entry/:id", (req, res) => {
    // console.log(req.params.id);
    // Find one journal entry that matches the id, based on the UserId
    db.Journal.findOne({
      where: {
        UserId: req.user.id,
        id: req.params.id
      },
      include: [db.Mood, db.Grateful, db.Remember],
    }).then(function (dbJournal) {
      // console.log(dbJournal);
      const rando = (Math.floor(Math.random() * 101) + 1);
      db.Affirmation.findOne({
        where: {
          id: rando
        },
      }).then(function (data) {
        // Renders the data onto the historical page
        const appetiteArray = ["Low", "Medium", "High", "Very High"];
        const handlebarsObject = {
          userName: "Charlie",
          medData: dbJournal.dataValues.Moods[0].medication,
          hoursData: dbJournal.dataValues.Moods[0].hoursSleep,
          moodData1: (dbJournal.dataValues.Moods[0].mood === 1) ? true : false,
          moodData2: (dbJournal.dataValues.Moods[0].mood === 2) ? true : false,
          moodData3: (dbJournal.dataValues.Moods[0].mood === 3) ? true : false,
          moodData4: (dbJournal.dataValues.Moods[0].mood === 4) ? true : false,
          moodData5: (dbJournal.dataValues.Moods[0].mood === 5) ? true : false,
          moodData6: (dbJournal.dataValues.Moods[0].mood === 6) ? true : false,
          exercise: dbJournal.dataValues.Moods[0].minutesExercise,
          napping: dbJournal.dataValues.Moods[0].minutesNapping,
          caffiene: dbJournal.dataValues.Moods[0].servingsCaffiene,
          alcohol: dbJournal.dataValues.Moods[0].servingsAlcohol,
          tv: dbJournal.dataValues.Moods[0].hoursTV,
          shower: dbJournal.dataValues.Moods[0].showered,
          brushed: dbJournal.dataValues.Moods[0].brushedTeeth,
          care: dbJournal.dataValues.Moods[0].selfCare,
          social: dbJournal.dataValues.Moods[0].minutesSocial,
          ache: dbJournal.dataValues.Moods[0].headache,
          nauseaa: dbJournal.dataValues.Moods[0].nausea,
          exhaust: dbJournal.dataValues.Moods[0].exhaustion,
          sleepless: dbJournal.dataValues.Moods[0].insomnia,
          hunger: dbJournal.dataValues.Moods[0].appetite,
          period: dbJournal.dataValues.Moods[0].menstruation,
          grate1: dbJournal.dataValues.Gratefuls[0].one,
          grate2: dbJournal.dataValues.Gratefuls[0].two,
          grate3: dbJournal.dataValues.Gratefuls[0].three,
          grate4: dbJournal.dataValues.Gratefuls[0].four,
          grate5: dbJournal.dataValues.Gratefuls[0].five,
          rem1: dbJournal.dataValues.Remembers[0].one,
          rem2: dbJournal.dataValues.Remembers[0].two,
          rem3: dbJournal.dataValues.Remembers[0].three,
          rem4: dbJournal.dataValues.Remembers[0].four,
          rem5: dbJournal.dataValues.Remembers[0].five,
          journalText: dbJournal.dataValues.entry,
          appetiteText: appetiteArray[dbJournal.dataValues.Moods[0].appetite - 1],
          appetiteValue: dbJournal.dataValues.Moods[0].appetite,
          affirmData: data.dataValues.quote,
        };
        res.render("historical", handlebarsObject);
      });
    });
  });


  // API call to get the calendar data
  app.get("/api/calendar", function (req, res) {
    // Gets the data for each mood based on the journal and UserId they are tied to
    db.Mood.findAll({
      include: [
        { model: db.Journal, 
          where: { UserId: req.user.id }}]
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

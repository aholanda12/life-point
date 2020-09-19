// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models");

module.exports = function (app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/home");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/home");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // This is to pass back the affirmation.
  app.get("/home", isAuthenticated, (req, res) => {
   
    console.log("home");
    res.render("home", {
      layout: "homelayout"
    });
  });

  // Routes to the blank data entry page
  app.get("/members", isAuthenticated, (req, res) => {
    //const handlebarsObject = { affirmData: "Hello" }
    //res.render("members", handlebarsObject);
    db.Affirmation.findAll().then(function (data) {
      // randomly pick one affirmation
      const rando = (Math.floor(Math.random() * 101) + 1);
      const handlebarsObject = {
        userName: "Charlie",
        affirmData: data[rando].quote
      };
      console.log("members");
      res.render("members", handlebarsObject);
    });

  });

  // Routes to a historical page
  app.get("/historical", isAuthenticated, (req, res) => {
    db.Affirmation.findAll().then(function (data) {
      const rando = (Math.floor(Math.random() * 101) + 1);
      const handlebarsObject = {
        affirmData: data[rando].dataValues.quote
      };
      res.render("historical", handlebarsObject);
    });
  });

  // Routes to the calendar page
  app.get("/calendar", isAuthenticated, (req, res) => {
    
    const handlebarsObject = { calendar:"Hello" };
    res.render("calendar", handlebarsObject);
  });

  // Routes to the resource page
  app.get("/resources", (req, res) => {
    const handlebarsObject = { resources:"Hello" };
    res.render("resources", handlebarsObject);
  });

};
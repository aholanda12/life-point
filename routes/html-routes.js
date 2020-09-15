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

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  // app.get("/members", isAuthenticated, (req, res) => {
  //   // res.sendFile(path.join(__dirname, "../public/members.html"));
  //   res.render("home", handlebarsObject);
  // });

  // This is to pass back the affirmation. db.whatever.
  app.get("/home", isAuthenticated, (req, res) => {
   
    console.log("home");
    res.render("home", {
      layout: "homelayout"
    });
  });

  app.get("/members", isAuthenticated, (req, res) => {
    //const handlebarsObject = { affirmData: "Hello" }
    //res.render("members", handlebarsObject);
    db.Affirmation.findAll().then(function (data) {
      console.log(data[3].dataValues.quote);
      // randomly pick one affirmation
      const rando = (Math.floor(Math.random() * 101) + 1);
      const handlebarsObject = {
        userName: "Charlie",
        affirmData: data[rando].dataValues.quote
      };
      console.log("members");
      res.render("members", handlebarsObject);
    });

  });

  app.get("/historical", isAuthenticated, (req, res) => {
    const handlebarsObject = {
      userName: "Charlie",
    };
    console.log("historical");
    res.render("historical", handlebarsObject);
  });


  app.get("/calendar", (req, res) => {
    
    const handlebarsObject = { calendar:"Hello" }
    // console.log("calendar");
    res.render("calendar", handlebarsObject);
  });

  app.get("/resources", (req, res) => {
    const handlebarsObject = { resources:"Hello" }
    // console.log("resources");
    res.render("resources", handlebarsObject);
  });

};
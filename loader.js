const db = require("./models");

const fs = require("fs");

const readFile = require("util").promisify(fs.readFile);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync()
  .then(() => {
    return readFile("./db/affirmSeed.sql", "utf8");
  })
  .then(fileData => {
    fileData.split("\n").forEach(query => {
      db.Affirmation.create({
        quote: query.split("'")[1]
      }).then(data => {
        console.log("Ran: " + query);
        return data;
      });
    });
  });

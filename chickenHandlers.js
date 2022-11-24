const database = require("./database");

const getChickens = (req, res) => {
    database
      .query("select * from chickens")
      .then(([chickens]) => {
        res.json(chickens);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      });
  };

  module.exports = {
    getChickens
};
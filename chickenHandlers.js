const database = require("./database");

const getChickens = (req, res) => {
    database
      .query("SELECT * FROM chickens")
      .then(([result]) => {
        res.json(result);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

const getChickenByName = (req, res) => {
    const {name} = req.params;

    database
      .query("SELECT * FROM chickens WHERE name = ?", [name])
      .then(([result]) => {
        if (result.length) {
            res.json(result[0]);
        } else {
            res.sendStatus(404);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };
  
  const postChicken = (req, res) => {
    const {name, birthday, weight} = req.body;
    database
      .query("INSERT INTO chickens(name, birthday, weight) VALUES (?, DATE(?), ?)", [name, birthday, weight])
      .then(([result]) => {
        res.location(`/chickens/${result.name}`).sendStatus(201);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error saving the chicken");
      });
  };

  module.exports = {
    getChickens,
    getChickenByName,
    postChicken
};
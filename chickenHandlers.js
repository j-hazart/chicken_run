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

  const addChicken = (req, res) => {  
    const date = new Date(Date.now());
    const birthday = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    
    const {name, weight} = req.body;
    
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

  const delChicken = (req, res) => {
    const {name} = req.params;

    database
      .query("DELETE FROM chickens WHERE name = ?", [name])
      .then(([result]) => {
        if (result.affectedRows) {
            res.sendStatus(204);
        } else {
            res.sendStatus(404);
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error deleting the chicken");
      });
  };

  const editChicken = (req, res) => {
    const {name} = req.params;

    database
      .query("UPDATE chickens SET ? WHERE name = ?", [req.body, name])
      .then(([result]) => {
        if (result.affectedRows) {
            res.sendStatus(204);
        } else {
            res.sendStatus(404);
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error editing the chicken");
      });
  };

  const addChickenStep = (req, res) => {
    database
      .query("UPDATE chickens SET steps = steps + 1")
      .then(([result]) => {
        if (result.affectedRows) {
            res.sendStatus(204);
        } else {
            res.sendStatus(404);
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error to make walking chickens");
      });
  };

  module.exports = {
    getChickens,
    getChickenByName,
    addChicken,
    delChicken,
    editChicken,
    addChickenStep
};
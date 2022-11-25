const database = require("./database");

/**
 * It queries the database for all chickens and returns the result as a JSON object
 * @param req - The request object. This is an object that represents the HTTP request and has
 * properties for the request query string, parameters, body, HTTP headers, and so on.
 * @param res - the response object
 */
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

/**
 * It takes a name from the URL, queries the database for a chicken with that name, and returns the
 * chicken if it exists, or a 404 if it doesn't
 * @param req - The request object. This contains information about the HTTP request that raised the
 * event.
 * @param res - the response object
 */
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

/**
* It takes the name and weight from the request body, and adds a new chicken to the database with
* the current date as the birthday
 * @param req - The request object. This contains information about the HTTP request that raised the
* event.
* @param res - The response object.
 */
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

/**
* It deletes a chicken from the database
* @param req - The request object. This contains information about the HTTP request that raised the
* event.
* @param res - The response object.
*/
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

/**
 * It updates the chicken with the given name with the given data
 * @param req - The request object.
 * @param res - the response object
 */
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

/**
 * It adds one to the steps column of the chickens table
 * @param req - The request object. This contains information about the HTTP request that raised the
 * event.
 * @param res - the response object
 */
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
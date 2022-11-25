const database = require("./database");

/**
 * It takes a request and a response, and then it queries the database for the items in the stock
 * table, and then it sends the result of that query back to the client
 * @param req - The request object.
 * @param res - the response object
 */
const getItems = (req, res) => {
    const initialSql = "SELECT name, item, quantity FROM stock INNER JOIN chickens ON stock.chicken_id = chickens.id";
    const where = [];

    if (req.query.item != null) {
        where.push({
        column: "item",
        value: req.query.item,
        operator: "=",
        });
    }
    if (req.query.name != null) {
        where.push({
        column: "name",
        value: req.query.name,
        operator: "=",
        });
    }

    database
    .query(
        where.reduce(
          (sql, { column, operator }, index) =>
            `${sql} ${index === 0 ? "where" : "and"} ${column} ${operator} ?`,
            initialSql
        ),
        where.map(({ value }) => value)
        )
        .then(([result]) => {
            res.json(result);
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
    });
};


module.exports = {
  getItems
};
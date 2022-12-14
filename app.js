require('dotenv').config();
const express = require('express');

const serverPort = process.env.SERVER_PORT || 3000;

const app = express();

app.use(express.json());

const chickenHandlers = require("./chickenHandlers");
const stockHandlers = require("./stockHandlers");

const home = (req, res) => {
    res.send('Welcome to the chicken coop')
}

app.get('/', home);

app.get('/chickens', chickenHandlers.getChickens);
app.get('/chickens/:name', chickenHandlers.getChickenByName);
app.post('/chickens', chickenHandlers.addChicken);
app.put('/chickens/:name', chickenHandlers.editChicken);
app.patch('/chickens/run', chickenHandlers.addChickenStep)
app.delete('/chickens/:name', chickenHandlers.delChicken);

app.get('/stock', stockHandlers.getItems);

app.listen(serverPort, (err) => {
    if (err) {
      console.error('Something bad happened');
    } else {
      console.log(`Server is listening on ${serverPort}`);
    }
  });
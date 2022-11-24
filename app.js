require('dotenv').config();
const express = require('express');

const serverPort = process.env.SERVER_PORT || 3000;

const app = express();

app.use(express.json());

const home = (req, res) => {
    res.send('Welcome to the chicken coop')
}

app.get('/', home);

app.listen(serverPort, () => console.log('Server is listening on port', serverPort));
/*
using assignment from 100xdevs course
*/
const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.port || 5500;
const router = express.Router();

const todoRoutes = require('./logic');

const app = express();


app.get('/', (req, res) => {
    res.send("Welcome! You have managed to find me. Let me show you tricks =>")
});

//request shall first go through body parser
app.use(bodyParser.json());
app.use('/todos', todoRoutes);

app.listen(port, () => { console.log("request is heard at " + port); })

module.exports = app;
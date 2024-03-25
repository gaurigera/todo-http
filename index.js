/*
using assignment from 100xdevs course
*/
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')

const port = process.env.port || 3000;
const router = express.Router();

const todoRoutes = require('./logic');

const app = express();

//request shall first go through body parser
app.use(bodyParser.json());
app.use('/todos', todoRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => { console.log("request is heard at " + port); })

module.exports = app;
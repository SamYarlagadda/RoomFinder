const express = require('express');
const path = require('path');
const mysql = require('mysql');
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser');
var amqp = require('amqplib/callback_api');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const port = 3000; // Set your desired port number

app.use(express.static(path.join(__dirname, '../frontend'))); //😘

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/register.html'));
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

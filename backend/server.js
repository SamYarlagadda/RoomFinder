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

const pool = mysql.createPool({
  host: '10.241.214.202',
  user: 'rp855',
  password: 'rp855',
  database: 'RoomFinderDB',
  port: '3306',
})


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

app.get('/callback', (req, res) => {
  // handle authentication response here
  // redirect to home.html after successful authentication
  res.redirect('/home.html');
});

app.get('/users', (req,res)=>{
  const sql = 'select * from users';
  pool.query(sql,(err,data)=>{
    if(err) return res.json(err);
    return res.json(data);
  })
})

app.get('/adduser', (req, res) => {
  console.log(req.body);
  res.send("Response Received:" + req.body);
});

app.post('/register', (req, res) => {
  const { first_name, last_name, username, password, njit_id, email_address, date_of_birth, phone_number } = req.body;

  const query = 'INSERT INTO users (first_name, last_name, username, password, njit_id, email_address, date_of_birth, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  pool.query(query, [first_name, last_name, username, password, njit_id, email_address, date_of_birth, phone_number], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Server error');
      return;
    }
    
    res.send('User created successfully');
  });
});

app.post('/login', (req, res) => {
  const { username, njit_id, password } = req.body;

  // Query to check if the user exists in the database
  const query = 'SELECT * FROM users WHERE username = ? AND njit_id = ?';
  
  pool.query(query, [username, njit_id], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Server error');
      return;
    }

    if (results.length > 0) {
      // User exists, now we need to check the password
      // Note: This is where you'd compare the hashed password in a real-world scenario
      if (results[0].password === password) {
        res.send('Login successful');
      } else {
        res.status(401).send('Incorrect password');
      }
    } else {
      res.status(404).send('User not found');
    }
  });
});

// Express Backend

amqp.connect('amqp://ssy22:ssy22@10.241.141.94:5672/ssy22', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }
        var queue = 'backend';

        channel.assertQueue(queue, {
            durable: false
        });
    });
});


// Your other Express middleware and routes go here

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

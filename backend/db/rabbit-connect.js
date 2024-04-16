const express = require('express');
const app = express();
const amqp = require('amqplib/callback_api');
const mysql = require('mysql');

// Establish a connection to MySQL
const pool = mysql.createPool({
    host: '10.241.214.202',
    user: 'rp855',
    password: 'rp855',
    database: 'RoomFinderDB',
    port: '3306',
  })

db.connect((err) => {
  if(err) throw err;
  console.log('Connected to MySQL');
});

// Connect to RabbitMQ
amqp.connect('amqp://ssy22:ssy22@10.241.141.94:5672/ssy22', (err, conn) => {
  if(err) throw err;

  conn.createChannel((err, ch) => {
    if(err) throw err;

    let queue = 'your_queue';

    ch.assertQueue(queue, {durable: false});

    console.log("Waiting for messages in %s", queue);

    ch.consume(queue, (msg) => {
      // Parse the message and update MySQL
      let query = "YOUR SQL QUERY HERE";
      db.query(query, (err, result) => {
        if(err) throw err;
        console.log("Database updated");
      });
    }, {noAck: true});
  });
});

app.listen(3000, () => {
  console.log('App is listening on port 3000');
});
const express = require('express');
const app = express();
var mysql = require('mysql');
var amqp = require('amqplib/callback_api');

// Create a MySQL connection pool
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : '10.241.214.202',
  user            : 'rp855',
  password        : 'rp855',
  database        : 'RoomFinderDB'
});

// Listen for changes in the database
pool.query('SELECT * FROM users', function(err, result) {
  if (err) throw err;

  // Connect to RabbitMQ
  amqp.connect('amqp://ssy22:ssy22@10.241.141.94:5672/ssy22', function(err, conn) {
    if (err) throw err;

    // Create a channel
    conn.createChannel(function(err, ch) {
      if (err) throw err;

      var queue = 'db';

      // Assert the queue
      ch.assertQueue(queue, {durable: false});

      // Publish the changes to the queue
      ch.sendToQueue(queue, new Buffer.from(JSON.stringify(result)));
      console.log('Sent changes to RabbitMQ');
    });
  });
});
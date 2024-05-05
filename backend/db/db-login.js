const amqp = require('amqplib/callback_api');
const mysql = require('mysql');
require('dotenv').config();

// Create a new pool instance
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

amqp.connect('amqp://ssy22:ssy22@10.241.141.94/ssy22', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        let dbQueue = 'db_register';

        channel.assertQueue(dbQueue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", dbQueue);

        channel.consume(dbQueue, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());

            // Parse the message content to JSON
            let credentials = JSON.parse(msg.content.toString());

            // Query the database
            pool.query('SELECT * FROM users WHERE username = ? AND njit_id = ?', [credentials.username, credentials.njit_id], (err, results) => {
                if(err) {
                    console.log(err);
                } else {
                    if(results.length > 0) {
                        console.log('User exists');
                    } else {
                        console.log('User does not exist');
                        // Insert the new user into the database
                        pool.query('INSERT INTO users SET ?', credentials, (err, res) => {
                            if(err) {
                                console.log('Error inserting new user:', err);
                            } else {
                                console.log('Inserted new user with id:', res.insertId);
                            }
                        });
                    }
                }
            });

        }, {
            noAck: true
        });
    });
});

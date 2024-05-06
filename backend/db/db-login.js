const amqp = require('amqplib/callback_api');
const mysql = require('mysql');

// Create a new pool instance
const pool = mysql.createPool({
    host: '10.241.100.23',
    user: 'rp855',
    password: 'rp855',
    database: 'RoomFinderDB',
    port: 3306,
});

amqp.connect('amqp://ssy22:ssy22@10.241.141.94/ssy22', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        let dbQueue = 'db_login';
        let responseQueue = 'login_response';

        channel.assertQueue(dbQueue, {
            durable: false
        });

        channel.assertQueue(responseQueue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", dbQueue);

        channel.consume(dbQueue, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());

            // Parse the message content to JSON
            let credentials = JSON.parse(msg.content.toString());

            // Query the database
            pool.query('SELECT * FROM users WHERE username = ? AND njit_id = ? AND password = ?', [credentials.username, credentials.njit_id, credentials.password], (err, results) => {
                if(err) {
                    console.log(err);
                } else {
                    if(results.length > 0) {
                        console.log('User exists and password is correct');
                        // Send a 'successful' message to the 'login_response' queue
                        channel.sendToQueue(responseQueue, Buffer.from('successful'));
                    } else {
                        console.log('User does not exist or password is incorrect');
                        // Optionally, you can send a 'failed' message if the user does not exist or the password is incorrect
                        channel.sendToQueue(responseQueue, Buffer.from('failed'));
                    }
                }
            });

        }, {
            noAck: true
        });
    });
});

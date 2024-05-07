const amqp = require('amqplib/callback_api');
const mysql = require('mysql');

const pool = mysql.createPool({
    host: '10.241.130.162',
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

        let dbQueue = 'db_change';
        let responseQueue = 'change_response';

        channel.assertQueue(dbQueue, {
            durable: false
        });

        channel.assertQueue(responseQueue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", dbQueue);

        channel.consume(dbQueue, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());

            let credentials = JSON.parse(msg.content.toString());

            pool.query('SELECT * FROM users WHERE username = ? AND njit_id = ? AND password = ?', [credentials.username, credentials.njit_id, credentials.old_password], (err, results) => {
                if(err) {
                    console.log(err);
                } else {
                    if(results.length > 0) {
                        console.log('User exists');
                        pool.query('UPDATE users SET password = ? WHERE username = ? AND njit_id = ? AND password = ?', [credentials.new_password, credentials.username, credentials.njit_id, credentials.old_password], (err, results) => {
                            if(err) {
                                console.log(err);
                            } else {
                                console.log('Password updated successfully');
                                channel.sendToQueue(responseQueue, Buffer.from('successful'));
                            }
                        });
                    } else {
                        console.log('User does not exist or old password is incorrect');
                        channel.sendToQueue(responseQueue, Buffer.from('unsuccessful'));
                    }
                }
            });

        }, {
            noAck: true
        });
    });
});

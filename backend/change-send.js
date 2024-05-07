const amqp = require('amqplib/callback_api');

// Replace 'localhost' with your RabbitMQ server IP
const url = 'amqp://ssy22:ssy22@10.241.141.94/ssy22';
const backendQueue = 'backend_change';
const dbQueue = 'db_change';

amqp.connect(url, function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        channel.assertQueue(backendQueue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", backendQueue);

        channel.consume(backendQueue, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());

            // Create db queue and send message
            channel.assertQueue(dbQueue, {
                durable: false
            });

            channel.sendToQueue(dbQueue, Buffer.from(msg.content.toString()));
            console.log(" [x] Sent %s", msg.content.toString());
        }, {
            noAck: true
        });
    });
});

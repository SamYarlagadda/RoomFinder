const amqp = require('amqplib/callback_api');

// Replace 'localhost' with your RabbitMQ server IP
const url = 'amqp://ssy22:ssy22@10.241.141.94/ssy22';
const frontendQueue = 'frontend_register';
const backendQueue = 'backend_register';

amqp.connect(url, function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        channel.assertQueue(frontendQueue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", frontendQueue);

        channel.consume(frontendQueue, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());

            // Create backend queue and send message
            channel.assertQueue(backendQueue, {
                durable: false
            });

            channel.sendToQueue(backendQueue, Buffer.from(msg.content.toString()));
            console.log(" [x] Sent %s", msg.content.toString());
        }, {
            noAck: true
        });
    });
});
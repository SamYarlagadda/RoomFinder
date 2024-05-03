const amqp = require('amqplib/callback_api');

function sendToBackend(message) {
    // Replace 'localhost' with your RabbitMQ server IP
    amqp.connect('amqp://ssy22:ssy22@10.241.141.94/ssy22', function(error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }

            let queue = 'backend_queue';

            channel.assertQueue(queue, {
                durable: false
            });

            channel.sendToQueue(queue, Buffer.from(message));
            console.log(" [x] Sent %s", message);
        });
    });
}

module.exports = sendToBackend; // Export the function

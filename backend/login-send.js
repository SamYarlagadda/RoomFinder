const amqp = require('amqplib/callback_api');

amqp.connect('amqp://ssy22:ssy22@10.241.141.94/ssy22', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        let backendQueue = 'backend_login';
        let dbQueue = 'db_login';

        channel.assertQueue(backendQueue, {
            durable: false
        });

        channel.assertQueue(dbQueue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", backendQueue);

        channel.consume(backendQueue, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());

            // Send message to db-queue
            channel.sendToQueue(dbQueue, Buffer.from(msg.content.toString()));
            console.log(" [x] Sent %s", msg.content.toString());

        }, {
            noAck: true
        });
    });
});

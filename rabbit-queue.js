const amqp = require('amqplib/callback_api');

amqp.connect('amqp://ssy22:ssy22@10.241.141.94:5672/ssy22', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        // Create queues
        const queue1 = 'frontend_queue';
        const queue2 = 'backend_queue';
        const queue3 = 'database_queue';

        // Assert queues
        channel.assertQueue(queue1, { durable: false });
        channel.assertQueue(queue2, { durable: false });
        channel.assertQueue(queue3, { durable: false });

        console.log('Queues %s, %s, %s have been created', queue1, queue2, queue3);
    });
});
const amqp = require('amqplib');

async function receiveMessage() {
  const connection = await amqp.connect('amqp://10.241.36.124');
  const channel = await connection.createChannel();

  const queue = 'messages';

  await channel.assertQueue(queue, { durable: false });
  console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

  channel.consume(queue, (message) => {
    console.log(" [x] Received %s", message.content.toString());
  }, { noAck: true });
}

receiveMessage().catch(console.error); 
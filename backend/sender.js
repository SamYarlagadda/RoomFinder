const amqp = require('amqplib');
const port = 5672; // Set your desired port number

async function sendMessage() {
  const connection = await amqp.connect('amqp://ssy22:ssy22@10.241.141.94:5672/ssy22');
  const channel = await connection.createChannel();

  const queue = 'messages';

  await channel.assertQueue(queue, { durable: false });
  const message = 'Hello, RabbitMQ!';

  channel.sendToQueue(queue, Buffer.from(message));
  console.log(" [x] Sent %s", message);

  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
}

sendMessage().catch(console.error);

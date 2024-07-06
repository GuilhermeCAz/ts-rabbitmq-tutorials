import * as amqp from 'amqplib';

async function connectAndReceive() {
  const connection = await amqp.connect('amqp://localhost'),
    channel = await connection.createChannel(),
    queue = 'hello';

  await channel.assertQueue(queue, { durable: false });

  console.log(` [*] Waiting for messages in ${queue}. To exit press CTRL+C`);

  await channel.consume(
    queue,
    (msg) => {
      if (msg) console.log(` [x] Received ${msg.content.toString()}`);
    },
    { noAck: true },
  );
}

await connectAndReceive();

import * as amqp from 'amqplib';

async function receive() {
  const connection = await amqp.connect('amqp://localhost'),
    // eslint-disable-next-line sort-vars
    channel = await connection.createChannel(),
    queue = 'hello';

  await channel.assertQueue(queue, { durable: false });

  console.log(` [*] Waiting for messages in ${queue}. To exit press CTRL+C`);

  await new Promise<void>((resolve) => {
    channel
      .consume(
        queue,
        (msg) => {
          if (msg) {
            console.log(` [x] Received ${msg.content.toString()}`);
            resolve();
          }
        },
        { noAck: true },
      )
      .catch((err: unknown) => {
        console.log(err);
      });
  });
}

receive().catch((err: unknown) => {
  console.log(err);
});

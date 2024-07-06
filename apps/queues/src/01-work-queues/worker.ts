import * as amqp from 'amqplib';

async function connectAndReceive() {
  const connection = await amqp.connect('amqp://localhost'),
    channel = await connection.createChannel(),
    queue = 'task_queue';

  await channel.assertQueue(queue, { durable: true });
  await channel.prefetch(1);

  console.log(` [*] Waiting for messages in ${queue}. To exit press CTRL+C`);

  await channel.consume(
    queue,
    (msg) => {
      if (msg) {
        const dotsToSecs = msg.content.toString().split('.').length - 1,
          msToSecs = 1000,
          exampleMs = dotsToSecs * msToSecs;

        console.log(` [x] Received ${msg.content.toString()}`);

        setTimeout(() => {
          console.log(' [x] Done');
          channel.ack(msg);
        }, exampleMs);
      }
    },
    { noAck: false },
  );
}

await connectAndReceive();

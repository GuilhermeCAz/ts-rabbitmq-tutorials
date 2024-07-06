import * as amqp from 'amqplib';

async function connectAndSend() {
  const connection = await amqp.connect('amqp://localhost'),
    // eslint-disable-next-line sort-vars
    channel = await connection.createChannel(),
    msg = 'Hello world!',
    queue = 'hello',
    timeout = 500;

  await channel.assertQueue(queue, { durable: false });

  channel.sendToQueue(queue, Buffer.from(msg));

  console.log(' [x] Sent %s', msg);

  setTimeout(() => {
    connection.close().catch((err: unknown) => {
      console.log(err);
    });
  }, timeout);
}

connectAndSend().catch((err: unknown) => {
  console.log(err);
});

import * as amqp from 'amqplib';

async function connectAndSend() {
  const connection = await amqp.connect('amqp://localhost'),
    channel = await connection.createChannel(),
    // Get argvs after 'node' 'new_task.ts'. Default: 'Hello World!'
    [, , ...argvs] = process.argv,
    msg = argvs.join(' ') || 'Hello World!',
    queue = 'task_queue',
    timeout = 500;

  await channel.assertQueue(queue, { durable: true });

  channel.sendToQueue(queue, Buffer.from(msg), { persistent: true });

  console.log(` [x] Sent ${msg}`);

  setTimeout(() => {
    connection.close().catch((err: unknown) => {
      console.error(err);
    });
  }, timeout);
}

await connectAndSend();

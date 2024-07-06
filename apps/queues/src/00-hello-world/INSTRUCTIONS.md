# Tutorial 00: Hello World

1. Ensure RabbitMQ server is running.

2. Open two terminals:

Terminal 1 (receiver):

```bash
cd apps/queues/src/00-hello-world
npx ts-node receive.ts
```

Terminal 2 (sender):

```bash
cd apps/queues/src/00-hello-world
npx ts-node send.ts
```

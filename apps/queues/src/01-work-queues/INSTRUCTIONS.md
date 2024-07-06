# Tutorial 00: Hello World

1. Ensure RabbitMQ server is running.

2. Open two terminals:

Terminal 1 (receiver):

```bash
cd apps/queues/src/01-work-queues
npx tsx worker.ts
```

Terminal 2 (sender):

```bash
cd apps/queues/src/01-work-queues
npx tsx new_task.ts
```

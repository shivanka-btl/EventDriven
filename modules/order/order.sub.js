const amqp = require('amqplib');

// ... RabbitMQ connection setup ...

// Subscribe to the order.created event
const subscribeToOrderCreated = async () => {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const exchange = 'order-exchange';
    const queueName = 'inventory-service';
    const routingKey = 'order.created';

    await channel.assertExchange(exchange, 'topic', { durable: false });
    const queue = await channel.assertQueue(queueName, { durable: true });
    await channel.bindQueue(queue.queue, exchange, routingKey);

    channel.consume(queue.queue, (msg) => {
        const eventData = JSON.parse(msg.content.toString());
        // Handle the order.created event (e.g., update inventory)
        console.log('Received order.created event:', eventData);
    }, { noAck: true });
};

// Start the subscription
subscribeToOrderCreated();

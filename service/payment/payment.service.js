// payment-service.js

const express = require('express');
const amqp = require('amqplib');

const app = express();
const port = 3001;

// REST endpoint to process payment
app.post('/processPayment', async (req, res) => {
    // Logic to process payment...

    res.status(200).json({ message: 'Payment processed successfully' });
});

// Function to subscribe to events
const subscribeToEvents = async () => {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const exchange = 'order-exchange';
    const queueName = 'payment-service';
    const routingKey = 'order.created';

    await channel.assertExchange(exchange, 'topic', { durable: false });
    const queue = await channel.assertQueue(queueName, { durable: true });
    await channel.bindQueue(queue.queue, exchange, routingKey);

    channel.consume(queue.queue, (msg) => {
        const eventData = JSON.parse(msg.content.toString());
        // Handle the order.created event (e.g., initiate payment process)
        console.log('Received order.created event:', eventData);

        // Process the payment (call /processPayment endpoint)
        // ...

        console.log('Payment processed for order:', eventData.orderId);
    }, { noAck: true });
};

// Start subscription to events
subscribeToEvents();

app.listen(port, () => {
    console.log(`Payment Service is running on port ${port}`);
});

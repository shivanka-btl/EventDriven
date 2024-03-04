// order-service.js

const express = require('express');
const amqp = require('amqplib');

const app = express();
const port = 3002;

// REST endpoint to get order details
app.get('/getOrder/:orderId', (req, res) => {
    const orderId = req.params.orderId;
    
    // Logic to retrieve order details synchronously...
    const orderDetails = getOrderDetails(orderId);

    res.status(200).json(orderDetails);
});

// REST endpoint to create an order
app.post('/createOrder', async (req, res) => {
    // Logic to create an order...

    // Publishing order.created event
    await publishEvent('order.created', { orderId: createdOrder.id, /* other relevant data */ });

    res.status(201).json({ message: 'Order created successfully' });
});

// Function to publish events
const publishEvent = async (routingKey, eventData) => {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const exchange = 'order-exchange';

    await channel.assertExchange(exchange, 'topic', { durable: false });

    // Publish the event
    channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(eventData)));

    console.log(`Event published: ${routingKey}`);
};

// Function to get order details synchronously
const getOrderDetails = (orderId) => {
    // Logic to retrieve order details...
    return { orderId, /* other order details */ };
};

app.listen(port, () => {
    console.log(`Order Service is running on port ${port}`);
});

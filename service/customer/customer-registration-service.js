// customer-registration-service.js

const express = require('express');
const amqp = require('amqplib');

const app = express();
const port = 3003;

// Middleware to parse JSON in the request body
app.use(express.json());

// REST endpoint for customer registration
app.post('/registerCustomer', async (req, res) => {
    // Logic to register the customer...

    /* get the customer ID after registration */;
    const customerId = "001";
    
    // Publishing customer registered event
    await publishEvent('customer.registered', { customerId, email: req.body.email });

    res.status(201).json({ message: 'Customer registered successfully' });
});

// Function to publish events
const publishEvent = async (routingKey, eventData) => {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const exchange = 'crm-exchange';

    await channel.assertExchange(exchange, 'topic', { durable: false });

    // Publish the event
    channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(eventData)));

    console.log(`Event published: ${routingKey}`);
};

app.listen(port, () => {
    console.log(`Customer Registration Service is running on port ${port}`);
});

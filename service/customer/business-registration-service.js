// business-registration-service.js

const amqp = require('amqplib');

// Function to subscribe to events
const subscribeToEvents = async () => {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const exchange = 'crm-exchange';
    const queueName = 'business-registration-service';
    const routingKey = 'customer.registered';

    await channel.assertExchange(exchange, 'topic', { durable: false });
    const queue = await channel.assertQueue(queueName, { durable: true });
    await channel.bindQueue(queue.queue, exchange, routingKey);

    channel.consume(queue.queue, (msg) => {
        const eventData = JSON.parse(msg.content.toString());
        // Handle the customer.registered event (e.g., initiate business registration processing)
        console.log('Received customer.registered event:', eventData);

        // Process the business registration information (call /processBusinessRegistration endpoint)
        // ...

        console.log('Business registration processed for customer:', eventData.customerId);
    }, { noAck: true });
};

// Start subscription to events
subscribeToEvents();

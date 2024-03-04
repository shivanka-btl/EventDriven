// address-information-service.js

const amqp = require('amqplib');

// Function to subscribe to events
const subscribeToEvents = async () => {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const exchange = 'crm-exchange';
    const queueName = 'address-information-service';
    const routingKey = 'customer.registered';

    await channel.assertExchange(exchange, 'topic', { durable: false });
    const queue = await channel.assertQueue(queueName, { durable: true });
    await channel.bindQueue(queue.queue, exchange, routingKey);

    channel.consume(queue.queue, (msg) => {
        const eventData = JSON.parse(msg.content.toString());
        // Handle the customer.registered event (e.g., initiate address information processing)
        console.log('Received customer.registered event:', eventData);

        // Process the address information (call /processAddressInformation endpoint)
        // ...

        console.log('Address information processed for customer:', eventData.customerId);
    }, { noAck: true });
};

// Start subscription to events
subscribeToEvents();

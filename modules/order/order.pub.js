const amqp = require('amqplib');

// ... Express setup code ...

// Send event when an order is created
app.post('/createOrder', async (req, res) => {
    // ... logic to create order ...

    // Publish the event
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const exchange = 'order-exchange';
    const routingKey = 'order.created';

    const eventData = {
        orderId: createdOrder.id,
        // other relevant data
    };

    channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(eventData)));
    
    res.status(201).json({ message: 'Order created successfully' });
});

// subscriber.js
const connectRabbitMQ = require('./rabbitmq');

async function subscribeToEvent(eventName, callback) {
  const channel = await connectRabbitMQ();
  await channel.assertExchange('events', 'direct', { durable: false });
  const { queue } = await channel.assertQueue('', { exclusive: true });
  channel.bindQueue(queue, 'events', eventName);
  channel.consume(queue, (msg) => {
    const eventData = JSON.parse(msg.content.toString());
    console.log('Received entityCreated event:', eventData);
    callback(eventData);
  });
}

module.exports = subscribeToEvent;

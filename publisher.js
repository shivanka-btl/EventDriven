// publisher.js
const connectRabbitMQ = require('./rabbitmq');

async function publishEvent(eventName, eventData) {
  const channel = await connectRabbitMQ();
  await channel.assertExchange('events', 'direct', { durable: false });
  channel.publish('events', eventName, Buffer.from(JSON.stringify(eventData)));
}

module.exports = publishEvent;

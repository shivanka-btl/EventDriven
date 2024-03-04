// app.js
const express = require('express');
const publishEvent = require('./publisher');
const subscribeToEvent = require('./subscriber');

const app = express();

// Your existing Express routes and logic

// Example: Publish an event
app.post('/create', async (req, res) => {
  // Your database logic to create an entity
  const createdEntity = { id: 123, name: 'Example' };

  // Publish event
  await publishEvent('entityCreated', createdEntity);

  res.json(createdEntity);
});

// Example: Subscribe to an event
subscribeToEvent('entityCreated', (eventData) => {
  // Handle the event, e.g., update cache or trigger additional actions
  console.log('Entity created:', eventData);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

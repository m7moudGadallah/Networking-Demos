const dgram = require('dgram');

const { TYPE, PORT, ADDRESS } = require('./server.config');

// UDP Client
const client = dgram.createSocket(TYPE);

/**
 * Simulate sensor data
 * @returns {string} sensor message
 */
function generateRandomData(sensorId) {
  const temperature = Math.floor(Math.random() * 100);
  const humidity = Math.floor(Math.random() * 100);

  return `${sensorId}: Temperature: ${temperature}°C, Humidity: ${humidity}%`;
}

function sendData(sensorId) {
  const data = generateRandomData(sensorId);
  const message = Buffer.from(data);

  client.send(message, PORT, ADDRESS, (err) => {
    console.log(`[${sensorId} Sent data: ${data}]`);
    setTimeout(() => sendData(sensorId), 5000);
  });
}

sendData('Sensor001');

const dgram = require('dgram');

// Server configuration
const { PORT, ADDRESS } = require('./server.config');

// UDP Client
const client = dgram.createSocket('udp4');

const message = Buffer.from('Hello, UDP Server!');

client.send(message, PORT, ADDRESS, (err) => {
  console.log(err);
  client.close();
});

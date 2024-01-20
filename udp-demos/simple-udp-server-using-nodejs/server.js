const dgram = require('dgram');

// Server configuration
const { PORT, ADDRESS } = require('./server.config');

// UDP Server
const server = dgram.createSocket('udp4');

server.on('message', (msg, info) => {
  console.log(
    `Server got  message: ${msg}\n\tfrom ${info.address}:${info.port}`
  );
  console.log('\t\t..............');
});

server.on('listening', () => {
  const address = server.address();
  console.log(`Server listening on ${address.address}:${address.port}\n`);
  console.log('##################################################\n\n');
});

server.bind(PORT, ADDRESS);

// NOTE: we can test it with terminal utility called netcat(https://en.wikipedia.org/wiki/Netcat)

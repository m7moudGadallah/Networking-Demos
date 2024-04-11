import net from 'net';

const server = net.createServer((socket) => {
  console.log(
    `TCP handshake successful with ${socket.remoteAddress}:${socket.remotePort}!`
  );

  socket.write(`You're connected!\n`);

  socket.on('data', (data) => {
    console.log(
      `Receiving Data from [${socket.remoteAddress}:${
        socket.remotePort
      }]: ${data.toString()}`
    );
  });

  socket.on('end', () => {
    console.log(
      `Client [${socket.remoteAddress}:${socket.remotePort}] disconnected!`
    );
  });
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Server is listening on port 3000!');
  // handle termination events
  process.once('SIGINT', () => {
    console.log('\nSIGINT signal received. Exiting...');
    server.close();
    process.exit(0);
  });

  process.once('SIGTERM', () => {
    console.log('\nSIGTERM signal received. Exiting...');
    server.close();
    process.exit(1);
  });
});

// NOTE: we can test it with terminal utility called netcat(https://en.wikipedia.org/wiki/Netcat)

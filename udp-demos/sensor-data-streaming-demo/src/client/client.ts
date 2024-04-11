import dgram from 'dgram';
import {
  SOCKET_TYPE,
  SERVER_PORT,
  SERVER_ADDRESS,
  SOCKET_TIMEOUT,
  MESSAGE_SENDING_FREQUENCY_MS,
} from './config';
import { SensorDataGenerator } from './SensorDataGenerator';

const socket = dgram.createSocket(SOCKET_TYPE);

// handle termination events
process.once('SIGINT', () => {
  console.log('\nSIGINT signal received. Exiting...');
  socket.close();
  process.exit(0);
});

process.once('SIGTERM', () => {
  console.log('\nSIGTERM signal received. Exiting...');
  socket.close();
  process.exit(1);
});

function sendData(
  timeOut: number,
  messageSendingFrequencyMs: number,
  ...sensorDataGenerator: SensorDataGenerator[]
) {
  const interval = setInterval(() => {
    const sensorsData: string[] = sensorDataGenerator.map((sensor) =>
      sensor.generateRandomData()
    );
    const messages = sensorsData.map((data) => Buffer.from(data));

    messages.forEach((message, index) =>
      socket.send(message, SERVER_PORT, SERVER_ADDRESS, (err) => {
        if (err) {
          console.error('Error sending data:', err);
        } else {
          console.log(`Data sent: ${sensorsData[index]}`);
        }
      })
    );
  }, messageSendingFrequencyMs);

  setTimeout(() => {
    clearInterval(interval);
    socket.close();
    console.log('Sending stopped and socket closed!');
  }, timeOut);
}

sendData(
  SOCKET_TIMEOUT,
  MESSAGE_SENDING_FREQUENCY_MS,
  new SensorDataGenerator('Sensor001'),
  new SensorDataGenerator('Sensor002')
);

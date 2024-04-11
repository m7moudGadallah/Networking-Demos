# Sensor Data Streaming

## Overview

- We simulate a scenario where sensors send data to a central server using UDP. The server processes and displays the incoming data. so we randomly generate data for simulation.

## Features

- **UDP Communication:** Sensors send data to the server using UDP, a lightweight, connectionless protocol suitable for streaming data.
- **Random Data Generation:** We generate random sensor data to simulate real-world sensor readings.
- **Centralized Server:** The Server acts as a central hub to receive, process and display sensor data.

## Implementation Details

### Server

- The server application listens for incoming UDP packets from sensors. it processes each packet and displays the sensor readings. The server also handlers termination signals to gracefully shut down the application.

### Sensor Client Simulator

- We simulate sensors by generating random data representing sensor readings. Each sensor periodically sends UDP packets containing the generated data to the server.

## Setup Instructions

- **Clone the Repository:** Clone the repository to your local machine.
- **Move to sensor simulator demo directory:**

```bash
  cd ./udp-demos/sensor-data-streaming-demo
```

- **Install Dependencies:**

```bash
  yarn install
# or if you using npm run
  npm install
```

- **Run Server:**

```bash
  yarn start:server
# or if you using npm run
  npm run start:server
```

- **Run Sensor Simulator client:**

```bash
  yarn start:client
# or if you using npm run
  npm run start:client
```

- **Monitor Sensor Data: Monitor the server console to view incoming sensor data.**

Enjoy the demo!

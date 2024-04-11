import { UDPServerSocket } from './UDPServerSocket';
import { PORT, ADDRESS, SOCKET_TYPE, TIME_TO_CLOSE } from './config';

const server = new UDPServerSocket(SOCKET_TYPE, TIME_TO_CLOSE);
server.listen(PORT, ADDRESS);

import dgram from 'dgram';

class UDPServerSocket {
  private readonly socket: dgram.Socket;
  private timer: NodeJS.Timeout | null;
  private readonly timeToClose: number;

  constructor(socketType?: dgram.SocketOptions['type'], timeToClose?: number) {
    this.timeToClose = timeToClose ? timeToClose : 2 * 60 * 1000;
    this.socket = dgram.createSocket(socketType ?? 'udp4');
    this.timer = null;
  }

  public listen(port: number, address?: string): void {
    this.socket.bind(port, address);

    this.handleSocketEvents();
    this.handleProcessTerminationEvents();
  }

  public close(): void {
    if (this.socket) {
      if (this.timer) clearTimeout(this.timer);
      this.socket.close();
      console.log('UDP socket closed!');
    }
  }

  private startTimer(): void {
    this.timer = setTimeout(() => {
      console.log(
        `No UDP messages received for ${this.timeToClose} ms. Closing UDP socket.`
      );
      this.close();
    }, this.timeToClose);
  }

  private resetTimer(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.startTimer();
  }

  private handleSocketEvents(): void {
    this.socket.on('listening', () => {
      this.startTimer();
      const address = this.socket.address();
      console.log(`Server listening on ${address.address}:${address.port}\n`);
      console.log('##################################################\n\n');
    });

    this.socket.on('message', (msg, rinfo) => {
      console.log(
        `Server got  message: ${msg}\n\tfrom ${rinfo.address}:${rinfo.port}`
      );
      console.log('\t\t..............');
      this.resetTimer();
    });
  }

  private handleProcessTerminationEvents(): void {
    // handle process termination events
    process.once('SIGINT', () => {
      console.log('\nSIGINT signal received. Exiting...');
      this.close();
      process.exit(0);
    });

    process.once('SIGTERM', () => {
      console.log('\nSIGTERM signal received. Exiting...');
      this.close();
      process.exit(1);
    });
  }
}

export { UDPServerSocket };

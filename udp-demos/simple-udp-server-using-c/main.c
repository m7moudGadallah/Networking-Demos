#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include<sys/socket.h>
#include<sys/types.h>
#include<netinet/in.h>
#include<arpa/inet.h>

#define PORT 5500
#define MAX_LINE 1024

int main(int argc, char **argv) {
  int sockfd; // socket file descriptor
  struct sockaddr_in myaddr, remote_addr;
  char buffer[MAX_LINE];
  socklen_t addr_size; // to store size of the addresses

  /**
   * create a UDP socket
   * AF_INET: address domain of the socket (IPv4)
   * SOCK_DGRAM: datagram-based protocol (UDP)
  */
  sockfd = socket(AF_INET, SOCK_DGRAM, 0);

  memset(&myaddr, '\0', sizeof(myaddr));
  myaddr.sin_family = AF_INET;
  myaddr.sin_port = htons(PORT);
  myaddr.sin_addr.s_addr = inet_addr("127.0.0.1");

  bind(sockfd, (struct sockaddr*)&myaddr, sizeof(myaddr));
  addr_size = sizeof(remote_addr);
  recvfrom(sockfd, buffer, MAX_LINE, 0, (struct sockaddr*)&remote_addr, &addr_size);
  printf("Data received: %s", buffer);

  return 0;
}
import { WebSocketGateway, OnGatewayInit, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class SignalingGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  afterInit() {
    console.log('WebSocket server initialized');
  }

  handleConnection(client: any) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected:', client.id);
  }

  listenForEvents() {
    this.server.on('connection', (socket) => {
      socket.on('offer', (data) => {
        console.log('Received offer:', data);
        socket.broadcast.emit('offer', data);
      });

      socket.on('answer', (data) => {
        console.log('Received answer:', data);
        socket.broadcast.emit('answer', data);
      });

      socket.on('ice-candidate', (data) => {
        console.log('Received ice-candidate:', data);
        socket.broadcast.emit('ice-candidate', data);
      });
    });
  }
}

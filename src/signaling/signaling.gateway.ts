import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayInit, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class SignalingGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  afterInit() {
    console.log('WebSocket server initialized');
  }

  @SubscribeMessage('offer')
  handleOffer(@MessageBody() data: any): void {
    console.log('Received offer:', data);
    this.server.emit('offer', data);
  }

  @SubscribeMessage('answer')
  handleAnswer(@MessageBody() data: any): void {
    console.log('Received answer:', data);
    this.server.emit('answer', data);
  }

  @SubscribeMessage('ice-candidate')
  handleIceCandidate(@MessageBody() data: any): void {
    console.log('Received ice-candidate:', data);
    this.server.emit('ice-candidate', data);
  }
}

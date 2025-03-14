/* eslint-disable prettier/prettier */
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { MatchingService } from './matching.service';

@WebSocketGateway({ cors: true })
export class MatchingGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly matchingService: MatchingService) {}

  private connectedClients: { [clientId: string]: Socket } = {};

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    this.connectedClients[client.id] = client;
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    delete this.connectedClients[client.id];
  }

  @SubscribeMessage('request_service')
  async handleServiceRequest(
    @MessageBody()
    data: { clientId: string; serviceType: string; location: string },
    @ConnectedSocket() client: Socket,
  ) {
    const availableProfessional =
      await this.matchingService.findAvailableProfessional(
        data.serviceType,
        data.location,
      );

    if (availableProfessional) {
      client.emit('service_matched', { professional: availableProfessional });
      console.log(
        `Matched: ${availableProfessional.name} to Client: ${data.clientId}`,
      );
    } else {
      client.emit('no_match_found', {
        message: 'No professionals available at the moment',
      });
    }
  }
}

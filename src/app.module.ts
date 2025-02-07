// src/app.module.ts
import { Module } from '@nestjs/common';
import { SignalingGateway } from './signaling/signaling.gateway';

@Module({
  imports: [],
  controllers: [],
  providers: [SignalingGateway],
})
export class AppModule {}

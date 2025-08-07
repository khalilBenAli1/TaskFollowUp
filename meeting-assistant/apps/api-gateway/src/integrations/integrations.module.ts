import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Integration,
  Connection,
  OAuthToken,
} from '@shared/types';
import { IntegrationsService } from './integrations.service.js';
import { IntegrationsController } from './integrations.controller.js';
import { CryptoService } from './crypto.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Integration, Connection, OAuthToken])],
  providers: [IntegrationsService, CryptoService],
  controllers: [IntegrationsController],
})
export class IntegrationsModule {}

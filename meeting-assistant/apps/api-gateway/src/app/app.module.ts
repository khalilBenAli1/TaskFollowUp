import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meeting, Integration, Connection, OAuthToken } from '@shared/types';
import { AppController } from './app.controller';
import { IntegrationsModule } from '../integrations/integrations.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [Meeting, Integration, Connection, OAuthToken],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Meeting]),
    IntegrationsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meeting } from '@shared/types';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [Meeting],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Meeting]),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

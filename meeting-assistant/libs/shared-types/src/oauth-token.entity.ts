import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Connection } from './connection.entity.js';

@Entity('oauth_tokens')
export class OAuthToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Connection)
  connection: Connection;

  @Column()
  accessTokenEnc: string;

  @Column()
  refreshTokenEnc: string;

  @Column()
  expiresAt: Date;
}

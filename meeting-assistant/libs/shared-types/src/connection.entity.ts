import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Integration } from './integration.entity.js';

@Entity('connections')
export class Connection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Integration)
  integration: Integration;

  @Column()
  displayName: string;

  @Column('jsonb')
  config: Record<string, any>;

  @Column()
  createdBy: string;

  @CreateDateColumn()
  createdAt: Date;
}

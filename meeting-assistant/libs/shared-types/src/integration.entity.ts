import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IntegrationKind } from './integration.enums.js';

@Entity('integrations')
export class Integration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: IntegrationKind })
  kind: IntegrationKind;

  @Column({ unique: true })
  code: string;
}

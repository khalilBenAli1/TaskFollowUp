import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { promises as fs } from 'fs';
import { join } from 'path';
import {
  Integration,
  Connection,
  OAuthToken,
  IntegrationKind,
} from '@shared/types';
import { CryptoService } from './crypto.service.js';

@Injectable()
export class IntegrationsService {
  constructor(
    @InjectRepository(Integration)
    private integrationRepo: Repository<Integration>,
    @InjectRepository(Connection)
    private connectionRepo: Repository<Connection>,
    @InjectRepository(OAuthToken)
    private tokenRepo: Repository<OAuthToken>,
    private crypto: CryptoService
  ) {}

  async onModuleInit() {
    try {
      const count = await this.integrationRepo.count();
      if (count === 0) {
        await this.integrationRepo.save([
          { name: 'Google Meet', code: 'google_meet', kind: IntegrationKind.SOURCE },
          { name: 'Microsoft Teams', code: 'microsoft_teams', kind: IntegrationKind.SOURCE },
          { name: 'RingCentral', code: 'ringcentral', kind: IntegrationKind.SOURCE },
          { name: 'Jira Cloud', code: 'jira', kind: IntegrationKind.DESTINATION },
          { name: 'Microsoft Planner', code: 'planner', kind: IntegrationKind.DESTINATION },
          { name: 'Trello', code: 'trello', kind: IntegrationKind.DESTINATION },
        ]);
      }
    } catch (err) {
      throw err;
    }
  }

  async listIntegrations() {
    try {
      return await this.integrationRepo.find();
    } catch (err) {
      throw err;
    }
  }

  async listConnections() {
    try {
      return await this.connectionRepo.find({ relations: ['integration'] });
    } catch (err) {
      throw err;
    }
  }

  async createConnection(dto: {
    integrationCode: string;
    displayName: string;
    config: Record<string, any>;
    createdBy?: string;
  }) {
    try {
      const integration = await this.integrationRepo.findOneBy({ code: dto.integrationCode });
      if (!integration) throw new Error('integration not found');
      const conn = this.connectionRepo.create({
        integration,
        displayName: dto.displayName,
        config: dto.config,
        createdBy: dto.createdBy || 'user',
      });
      return await this.connectionRepo.save(conn);
    } catch (err) {
      throw err;
    }
  }

  async saveToken(id: string, dto: {
    access: string;
    refresh: string;
    expires: string;
  }) {
    try {
      const connection = await this.connectionRepo.findOneBy({ id });
      if (!connection) throw new Error('connection not found');
      const token = this.tokenRepo.create({
        connection,
        accessTokenEnc: await this.crypto.encrypt(dto.access),
        refreshTokenEnc: await this.crypto.encrypt(dto.refresh),
        expiresAt: new Date(dto.expires),
      });
      return await this.tokenRepo.save(token);
    } catch (err) {
      throw err;
    }
  }

  async getSchema(code: string) {
    try {
      const file = join(__dirname, '..', 'platform-schemas', `${code}.schema.json`);
      const data = await fs.readFile(file, 'utf8');
      return JSON.parse(data);
    } catch (err) {
      throw err;
    }
  }
}

import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { IntegrationsService } from './integrations.service.js';

@Controller()
export class IntegrationsController {
  constructor(private service: IntegrationsService) {}

  @Get('integrations')
  async integrations() {
    try {
      return await this.service.listIntegrations();
    } catch (err) {
      throw err;
    }
  }

  @Get('connections')
  async connections() {
    try {
      return await this.service.listConnections();
    } catch (err) {
      throw err;
    }
  }

  @Post('connections')
  async createConnection(
    @Body() body: { integrationCode: string; displayName: string; config: Record<string, any> }
  ) {
    try {
      return await this.service.createConnection(body);
    } catch (err) {
      throw err;
    }
  }

  @Put('connections/:id/token')
  async saveToken(
    @Param('id') id: string,
    @Body() body: { access: string; refresh: string; expires: string }
  ) {
    try {
      return await this.service.saveToken(id, body);
    } catch (err) {
      throw err;
    }
  }

  @Get('integrations/:code/schema')
  async schema(@Param('code') code: string) {
    try {
      return await this.service.getSchema(code);
    } catch (err) {
      throw err;
    }
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitIntegrations1700000000000 implements MigrationInterface {
  name = 'InitIntegrations1700000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "integration_kind_enum" AS ENUM('source','destination')`);
    await queryRunner.query(`CREATE TABLE "integrations" ("id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(), "name" varchar NOT NULL, "kind" "integration_kind_enum" NOT NULL, "code" varchar NOT NULL UNIQUE)`);
    await queryRunner.query(`CREATE TABLE "connections" ("id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(), "integrationId" uuid, "displayName" varchar NOT NULL, "config" jsonb NOT NULL, "createdBy" varchar NOT NULL, "createdAt" TIMESTAMP DEFAULT now(), CONSTRAINT "FK_conn_integration" FOREIGN KEY ("integrationId") REFERENCES "integrations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
    await queryRunner.query(`CREATE TABLE "oauth_tokens" ("id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(), "connectionId" uuid, "accessTokenEnc" varchar NOT NULL, "refreshTokenEnc" varchar NOT NULL, "expiresAt" TIMESTAMP NOT NULL, CONSTRAINT "FK_token_connection" FOREIGN KEY ("connectionId") REFERENCES "connections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "oauth_tokens"`);
    await queryRunner.query(`DROP TABLE "connections"`);
    await queryRunner.query(`DROP TABLE "integrations"`);
    await queryRunner.query(`DROP TYPE "integration_kind_enum"`);
  }
}

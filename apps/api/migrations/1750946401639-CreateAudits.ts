import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateAudits1750946401639 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "Audits"
      (
        "auditId"   UUID               DEFAULT uuid_generate_v4(),
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "entity"    VARCHAR(32),
        "entityId"  UUID      NOT NULL,
        "source"    VARCHAR(32),
        "eventType" VARCHAR(32),
        "eventId"   VARCHAR(64),
        "data"      jsonb,
        CONSTRAINT "PK_Audits_auditId" PRIMARY KEY ("auditId")
      );
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "Audits";
    `)
  }
}

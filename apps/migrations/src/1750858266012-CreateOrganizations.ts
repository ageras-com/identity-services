import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOrganizations1750858266012 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "Organizations"
      (
        "globalOrgId" UUID NOT NULL DEFAULT uuid_generate_v4(),
        CONSTRAINT "PK_Organizations_globalOrgId" PRIMARY KEY ("globalOrgId")
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "Organizations";
    `);
  }
}

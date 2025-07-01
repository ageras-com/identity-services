import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateUsers1748865069677 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "Users"
      (
        "globalUserId"          UUID      NOT NULL DEFAULT uuid_generate_v4(),
        "createdAt"             TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt"             TIMESTAMP NOT NULL DEFAULT now(),
        "deletedAt"             TIMESTAMP,
        "email"                 VARCHAR(255),
        "emailVerifiedAt"       TIMESTAMP,
        "phoneNumber"           VARCHAR(32),
        "phoneNumberVerifiedAt" TIMESTAMP,
        "dataUpdatesLocked"     BOOLEAN   NOT NULL DEFAULT false,
        CONSTRAINT "PK_Users_globalUserId" PRIMARY KEY ("globalUserId"),
        CONSTRAINT "UQ_Users_email" UNIQUE ("email"),
        CONSTRAINT "UQ_Users_phoneNumber" UNIQUE ("phoneNumber")
      );
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "Users";
    `)
  }
}

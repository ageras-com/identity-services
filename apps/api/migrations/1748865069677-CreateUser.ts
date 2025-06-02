import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateUser1748865069677 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          CREATE TABLE "user" (
            "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            "name" VARCHAR NOT NULL,
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
            "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
            "deletedAt" TIMESTAMP
          );
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          DROP TABLE "user";
        `)
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProducts1750858338589 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "Products"
      (
        "productId" VARCHAR(32) PRIMARY KEY
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "Products";
    `);
  }
}

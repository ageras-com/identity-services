import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateUserProducts1750859185257 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "UserProducts"
      (
        "globalUserId"  uuid        NOT NULL,
        "productUserId" VARCHAR(64) NOT NULL,
        "productId"     VARCHAR(32) NOT NULL,
        PRIMARY KEY ("globalUserId", "productUserId", "productId"),
        CONSTRAINT "FK_users_globalUserId" FOREIGN KEY ("globalUserId") REFERENCES "Users" ("globalUserId") ON DELETE CASCADE,
        CONSTRAINT "FK_products_id" FOREIGN KEY ("productId") REFERENCES "Products" ("productId") ON DELETE CASCADE
      );
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "UserProducts";
    `)
  }
}

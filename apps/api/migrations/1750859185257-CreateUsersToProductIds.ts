import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateUsersToProductIds1750859185257
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "UsersToProductIds"
      (
        "globalUserId"  uuid        NOT NULL,
        "productUserId" VARCHAR(64) NOT NULL,
        "product"       VARCHAR(32) NOT NULL,
        PRIMARY KEY ("globalUserId", "productUserId", "product"),
        CONSTRAINT "FK_users_globalUserId" FOREIGN KEY ("globalUserId") REFERENCES "Users" ("globalUserId") ON DELETE CASCADE,
        CONSTRAINT "FK_products_id" FOREIGN KEY ("product") REFERENCES "Products" ("id") ON DELETE CASCADE
      );
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "UsersToProductIds";
    `)
  }
}

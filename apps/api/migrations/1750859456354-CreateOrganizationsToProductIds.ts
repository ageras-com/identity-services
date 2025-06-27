import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateOrganizationsToProductIds1750859456354
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE public.organization_status AS ENUM ('active', 'locked', 'terminated');
    `)

    await queryRunner.query(`
      CREATE TABLE "OrganizationsToProductIds"
      (
        "globalOrgId"  uuid                NOT NULL,
        "productOrgId" VARCHAR(64)         NOT NULL,
        "product"      VARCHAR(32)         NOT NULL,
        "status"       organization_status NOT NULL DEFAULT 'active',
        PRIMARY KEY ("globalOrgId", "productOrgId", "product"),
        CONSTRAINT "FK_user_globalOrgId" FOREIGN KEY ("globalOrgId") REFERENCES "Organizations" ("globalOrgId") ON DELETE CASCADE,
        CONSTRAINT "FK_product_id" FOREIGN KEY ("product") REFERENCES "Products" ("id") ON DELETE CASCADE
      );
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "OrganizationsToProductIds";
    `)
    await queryRunner.query(`
      DROP TYPE public.organization_status;
    `)
  }
}

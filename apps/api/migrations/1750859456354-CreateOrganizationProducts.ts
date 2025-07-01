import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateOrganizationProducts1750859456354
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE public.organization_status AS ENUM ('active', 'locked', 'terminated');
    `)

    await queryRunner.query(`
      CREATE TABLE "OrganizationProducts"
      (
        "globalOrgId"  uuid                NOT NULL,
        "productOrgId" VARCHAR(64)         NOT NULL,
        "productId"    VARCHAR(32)         NOT NULL,
        "status"       organization_status NOT NULL DEFAULT 'active',
        CONSTRAINT "PK_OrganizationProducts_globalOrgId_productUserId_productId" PRIMARY KEY ("globalOrgId", "productOrgId", "productId"),
        CONSTRAINT "FK_user_globalOrgId" FOREIGN KEY ("globalOrgId") REFERENCES "Organizations" ("globalOrgId") ON DELETE CASCADE,
        CONSTRAINT "FK_products_productId" FOREIGN KEY ("productId") REFERENCES "Products" ("productId") ON DELETE CASCADE
      );

      CREATE INDEX "IDX_OrganizationProducts_globalOrgId" ON "OrganizationProducts" ("globalOrgId");
      CREATE INDEX "IDX_OrganizationProducts_productOrgId" ON "OrganizationProducts" ("productOrgId");
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX "IDX_OrganizationProducts_productOrgId";
      DROP INDEX "IDX_OrganizationProducts_globalOrgId";
      DROP TABLE "OrganizationProducts";
      DROP TYPE public.organization_status;
    `)
  }
}

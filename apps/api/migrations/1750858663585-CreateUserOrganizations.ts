import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateUserOrganizations1750858663585
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "UserOrganizations"
      (
        "globalUserId" uuid NOT NULL,
        "globalOrgId"  uuid NOT NULL,
        CONSTRAINT "PK_UserOrganizations_globalUserId_globalOrgId" PRIMARY KEY ("globalUserId", "globalOrgId"),
        CONSTRAINT "FK_users_globalUserId" FOREIGN KEY ("globalUserId") REFERENCES "Users" ("globalUserId") ON DELETE CASCADE,
        CONSTRAINT "FK_organizations_globalOrgId" FOREIGN KEY ("globalOrgId") REFERENCES "Organizations" ("globalOrgId") ON DELETE CASCADE
      );
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "UserOrganizations";
    `)
  }
}

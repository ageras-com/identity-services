import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateUsersToOrganizations1750858663585
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "UsersOrganizations"
      (
        "globalUserId" uuid NOT NULL,
        "globalOrgId"  uuid NOT NULL,
        PRIMARY KEY ("globalUserId", "globalOrgId"),
        CONSTRAINT "FK_users_globalUserId" FOREIGN KEY ("globalUserId") REFERENCES "Users" ("globalUserId") ON DELETE CASCADE,
        CONSTRAINT "FK_organizations_globalOrgId" FOREIGN KEY ("globalOrgId") REFERENCES "Organizations" ("globalOrgId") ON DELETE CASCADE
      );
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "UsersOrganizations";
    `)
  }
}

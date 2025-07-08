import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { User } from './user.entity';
import { Organization } from '../../organization/entities/organization.entity';

@Entity('UserOrganizations', { schema: 'public' })
export class UserOrganization {
  @PrimaryColumn('uuid', {
    primaryKeyConstraintName: 'PK_UserOrganizations_globalUserId_globalOrgId',
  })
  globalUserId: string;

  @PrimaryColumn('uuid', {
    primaryKeyConstraintName: 'PK_UserOrganizations_globalUserId_globalOrgId',
  })
  globalOrgId: string;

  @ManyToOne(
    () => Organization,
    (organization) => organization.organizationUsers,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn([
    {
      name: 'globalOrgId',
      referencedColumnName: 'globalOrgId',
      foreignKeyConstraintName: 'FK_organizations_globalOrgId',
    },
  ])
  organization: Organization;

  @ManyToOne(() => User, (user) => user.userOrganizations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([
    {
      name: 'globalUserId',
      referencedColumnName: 'globalUserId',
      foreignKeyConstraintName: 'FK_users_globalUserId',
    },
  ])
  user: User;
}

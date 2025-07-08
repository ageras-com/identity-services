import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserOrganization } from '../../user/entities/userOrganization.entity';
import { OrganizationProduct } from './organizationProduct.entity';

@Entity('Organizations', { schema: 'public' })
export class Organization {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'PK_Users_globalUserId',
  })
  globalOrgId: string;

  @OneToMany(
    () => UserOrganization,
    (userOrganization) => userOrganization.organization,
  )
  organizationUsers: UserOrganization[];

  @OneToMany(
    () => OrganizationProduct,
    (organizationProduct) => organizationProduct.product,
  )
  organizationProducts: OrganizationProduct[];
}

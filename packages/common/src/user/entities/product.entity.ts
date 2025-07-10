import { Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { OrganizationProduct } from '../../organization/entities/organizationProduct.entity';
import { UserProduct } from './userProduct.entity';

@Entity('Products', { schema: 'public' })
export class Product {
  @PrimaryColumn('varchar', {
    length: '32',
    primaryKeyConstraintName: 'PK_UserOrganizations_globalUserId_globalOrgId',
  })
  productId: string;

  @OneToMany(() => UserProduct, (usersProducts) => usersProducts.user)
  users: UserProduct[];

  @OneToMany(
    () => OrganizationProduct,
    (organizationProduct) => organizationProduct.organization,
  )
  organizations: OrganizationProduct[];
}

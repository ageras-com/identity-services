import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { UserProduct } from '../../user/entities/userProduct.entity';
import { OrganizationProduct } from '../../organization/entities/organizationProduct.entity';

@Entity('Products', { schema: 'public' })
export class Product {
  @PrimaryColumn('varchar', {
    primaryKeyConstraintName: 'PK_UserOrganizations_globalUserId_globalOrgId',
    length: '32',
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

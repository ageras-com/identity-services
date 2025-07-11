import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { Product } from '../../user/entities/product.entity';
import { Organization } from './organization.entity';
import {
  type OrganizationStatus,
  organizationStatuses,
} from './organizationStatus.enum';

@Entity('OrganizationProducts', { schema: 'public' })
@Index('IDX_OrganizationProducts_globalOrgId', ['globalOrgId'])
@Index('IDX_OrganizationProducts_productOrgId', ['productOrgId'])
export class OrganizationProduct {
  @PrimaryColumn('uuid', {
    primaryKeyConstraintName:
      'PK_OrganizationProducts_globalOrgId_productUserId_productId',
  })
  globalOrgId: string;

  @PrimaryColumn('varchar', {
    length: '64',
    primaryKeyConstraintName:
      'PK_OrganizationProducts_globalOrgId_productUserId_productId',
  })
  productOrgId: string;

  @PrimaryColumn('varchar', {
    length: '32',
    primaryKeyConstraintName:
      'PK_OrganizationProducts_globalOrgId_productUserId_productId',
  })
  productId: string;

  @Column({
    default: organizationStatuses.active,
    enum: organizationStatuses,
    enumName: 'organization_status',
    type: 'enum',
  })
  status: OrganizationStatus;

  @ManyToOne(
    () => Organization,
    (organization) => organization.organizationProducts,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn([
    {
      foreignKeyConstraintName: 'FK_user_globalOrgId',
      name: 'globalOrgId',
      referencedColumnName: 'globalOrgId',
    },
  ])
  organization: Organization;

  @ManyToOne(() => Product, (product) => product.users, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([
    {
      foreignKeyConstraintName: 'FK_products_productId',
      name: 'productId',
      referencedColumnName: 'productId',
    },
  ])
  product: Product;
}

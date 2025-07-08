import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { Organization } from './organization.entity';
import {
  OrganizationStatus,
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
    primaryKeyConstraintName:
      'PK_OrganizationProducts_globalOrgId_productUserId_productId',
    length: '64',
  })
  productOrgId: string;

  @PrimaryColumn('varchar', {
    primaryKeyConstraintName:
      'PK_OrganizationProducts_globalOrgId_productUserId_productId',
    length: '32',
  })
  productId: string;

  @Column({
    type: 'enum',
    enum: organizationStatuses,
    default: organizationStatuses.active,
    enumName: 'organization_status',
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
      name: 'globalOrgId',
      referencedColumnName: 'globalOrgId',
      foreignKeyConstraintName: 'FK_user_globalOrgId',
    },
  ])
  organization: Organization;

  @ManyToOne(() => Product, (product) => product.users, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([
    {
      name: 'productId',
      referencedColumnName: 'productId',
      foreignKeyConstraintName: 'FK_products_productId',
    },
  ])
  product: Product;
}

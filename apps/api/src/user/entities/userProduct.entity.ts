import { Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';
import { Product } from '../../product/entities/product.entity';

@Entity('UserProducts', { schema: 'public' })
@Index('IDX_UserProducts_globalUserId', ['globalUserId'])
@Index('IDX_UserProducts_productUserId', ['productUserId'])
export class UserProduct {
  @PrimaryColumn('uuid', {
    primaryKeyConstraintName:
      'PK_UserProducts_globalUserId_productUserId_productId',
  })
  globalUserId: string;

  @PrimaryColumn('varchar', {
    primaryKeyConstraintName:
      'PK_UserProducts_globalUserId_productUserId_productId',
    length: '64',
  })
  productUserId: string;

  @PrimaryColumn('varchar', {
    primaryKeyConstraintName:
      'PK_UserProducts_globalUserId_productUserId_productId',
    length: '32',
  })
  productId: string;

  @ManyToOne(() => User, (user) => user.userProducts, {
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

import { Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { Product } from './product.entity';
import { User } from './user.entity';

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
    length: '64',
    primaryKeyConstraintName:
      'PK_UserProducts_globalUserId_productUserId_productId',
  })
  productUserId: string;

  @PrimaryColumn('varchar', {
    length: '32',
    primaryKeyConstraintName:
      'PK_UserProducts_globalUserId_productUserId_productId',
  })
  productId: string;

  @ManyToOne(() => User, (user) => user.userProducts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([
    {
      foreignKeyConstraintName: 'FK_users_globalUserId',
      name: 'globalUserId',
      referencedColumnName: 'globalUserId',
    },
  ])
  user: User;

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

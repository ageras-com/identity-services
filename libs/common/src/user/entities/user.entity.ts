import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

import { UserOrganization } from './userOrganization.entity';
import { UserProduct } from './userProduct.entity';

@Unique('UQ_Users_email', ['email'])
@Unique('UQ_Users_phoneNumber', ['phoneNumber'])
@Entity('Users', { schema: 'public' })
export class User {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'PK_Users_globalUserId',
  })
  globalUserId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @Column('varchar', { length: 255, nullable: true })
  email: string | null;

  @Column('timestamp', { nullable: true })
  emailVerifiedAt: Date | null;

  @Column('varchar', {
    length: 32,
    nullable: true,
  })
  phoneNumber: string | null;

  @Column('timestamp', { nullable: true })
  phoneNumberVerifiedAt: Date | null;

  @Column('boolean', { default: () => 'false' })
  dataUpdatesLocked: boolean;

  @OneToMany(
    () => UserOrganization,
    (userOrganization) => userOrganization.user,
  )
  userOrganizations: UserOrganization[];

  @OneToMany(() => UserProduct, (usersProducts) => usersProducts.user)
  userProducts: UserProduct[];
}

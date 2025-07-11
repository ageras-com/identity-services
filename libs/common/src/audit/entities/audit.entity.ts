import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Audits', { schema: 'public' })
export class Audit {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'PK_Audits_auditId',
  })
  auditId: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column('varchar', { length: '32', nullable: true })
  entity: string;

  @Column('uuid')
  entityId: string;

  @Column('varchar', { length: '32', nullable: true })
  source: string | null;

  @Column('varchar', { length: '32', nullable: true })
  eventType: string | null;

  @Column('varchar', { length: '64', nullable: true })
  eventId: string | null;

  @Column('jsonb', { nullable: true })
  data: object | null;
}

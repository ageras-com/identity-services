import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm"

@Entity("Audits", { schema: "public" })
export class Audit {
  @PrimaryGeneratedColumn("uuid", {
    primaryKeyConstraintName: "PK_Audits_auditId",
  })
  auditId: string

  @CreateDateColumn()
  createdAt: Date

  @Column("varchar", { nullable: true, length: "32" })
  entity: string

  @Column("uuid")
  entityId: string

  @Column("varchar", { nullable: true, length: "32" })
  source: string | null

  @Column("varchar", { nullable: true, length: "32" })
  eventType: string | null

  @Column("varchar", { nullable: true, length: "64" })
  eventId: string | null

  @Column("jsonb", { nullable: true })
  data: object | null
}

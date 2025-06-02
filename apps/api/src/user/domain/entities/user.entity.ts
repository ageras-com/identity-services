import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  name: string

  @Column()
  createdAt: Date

  @Column()
  updatedAt: Date

  @Column({ nullable: true, type: "timestamp" })
  deletedAt: Date | null
}

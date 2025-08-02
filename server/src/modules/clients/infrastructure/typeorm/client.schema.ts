import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("clients")
export class ClientSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  url: string | null;
} 
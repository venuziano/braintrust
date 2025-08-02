import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("departments")
export class DepartmentSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  client_id: number;

  @Column()
  name: string;
} 
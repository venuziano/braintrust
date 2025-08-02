import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { DepartmentSchema } from "../../../departments/infrastructure/typeorm/department.schema";
import { WorkflowSchema } from "../../../workflows/infrastructure/typeorm/workflow.schema";

@Entity("clients")
export class ClientSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  url: string | null;
  
  @OneToMany(() => DepartmentSchema, department => department.client)
  departments: DepartmentSchema[];

  @OneToMany(() => WorkflowSchema, workflow => workflow.client)
  workflows: WorkflowSchema[];
} 
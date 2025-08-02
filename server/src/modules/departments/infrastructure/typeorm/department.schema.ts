import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { ClientSchema } from "../../../clients/infrastructure/typeorm/client.schema";
import { WorkflowSchema } from "../../../workflows/infrastructure/typeorm/workflow.schema";

@Entity("departments")
export class DepartmentSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ClientSchema, client => client.departments)
  @JoinColumn({ name: "client_id" })
  client: ClientSchema;

  @Column()
  name: string;

  @OneToMany(() => WorkflowSchema, workflow => workflow.department)
  workflows: WorkflowSchema[];
} 
import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { ClientSchema } from "../../../clients/infrastructure/typeorm/client.schema";
import { DepartmentSchema } from "../../../departments/infrastructure/typeorm/department.schema";
import { NodeSchema } from "../../../nodes/infrastructure/typeorm/node.schema";
import { ExecutionSchema } from "../../../executions/infrastructure/typeorm/execution.schema";
import { BaseSchema } from "src/shared/entities/base.schema";

@Entity("workflows")
export class WorkflowSchema extends BaseSchema {
  @ManyToOne(() => ClientSchema, client => client.workflows)
  @JoinColumn({ name: "client_id" })
  client: ClientSchema;

  @ManyToOne(() => DepartmentSchema, department => department.workflows)
  @JoinColumn({ name: "department_id" })
  department: DepartmentSchema;

  @Column()
  name: string;

  @Column({ type: "text", nullable: true })
  description: string | null;

  @Column({ type: "interval", nullable: true })
  time_saved_per_exec: string | null;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  cost_saved_per_exec: number | null;

  @OneToMany(() => NodeSchema, node => node.workflow)
  nodes: NodeSchema[];
  
  @OneToMany(() => ExecutionSchema, execution => execution.workflow)
  executions: ExecutionSchema[];
} 
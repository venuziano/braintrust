import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { WorkflowSchema } from "../../../workflows/infrastructure/typeorm/workflow.schema";
import { ExceptionSchema } from "../../../exceptions/infrastructure/typeorm/exception.schema";

@Entity("executions")
export class ExecutionSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => WorkflowSchema, workflow => workflow.executions)
  @JoinColumn({ name: "workflow_id" })
  workflow: WorkflowSchema;

  @Column()
  succeeded: boolean;

  @Column({ type: "interval", nullable: true })
  time_taken: string | null;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  cost_saved: number | null;
  
  @OneToMany(() => ExceptionSchema, exception => exception.execution)
  exceptions: ExceptionSchema[];
} 
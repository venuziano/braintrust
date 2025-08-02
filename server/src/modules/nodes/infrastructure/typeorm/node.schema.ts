import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { WorkflowSchema } from "../../../workflows/infrastructure/typeorm/workflow.schema";

@Entity("nodes")
export class NodeSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => WorkflowSchema, workflow => workflow.nodes)
  @JoinColumn({ name: "workflow_id" })
  workflow: WorkflowSchema;

  @Column()
  name: string;

  @Column({ name: "node_type" })
  nodeType: string;

  @Column({ type: "jsonb", nullable: true })
  settings: Record<string, unknown> | null;
} 
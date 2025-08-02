import { Workflow } from "../entities/workflow.entity";

export const WORKFLOW_REPOSITORY_TOKEN = "WorkflowRepository";
 
export interface WorkflowRepository {
  findAll(): Promise<Workflow[]>;
  findById(id: number): Promise<Workflow | null>;
} 
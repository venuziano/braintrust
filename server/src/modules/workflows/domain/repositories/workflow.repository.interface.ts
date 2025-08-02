import { Workflow } from "../entities/workflow.entity";
import { TimePeriod } from "../../application/dto/get-total-workflows-kpi.dto";

export const WORKFLOW_REPOSITORY_TOKEN = "WorkflowRepository";
 
export interface WorkflowRepository {
  findAll(): Promise<Workflow[]>;
  findById(id: number): Promise<Workflow | null>;
  getTotalWorkflowsKpi(timePeriod: TimePeriod): Promise<{
    currentCount: number;
    previousCount: number;
  }>;
} 
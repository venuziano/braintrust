import { Workflow } from "../entities/workflow.entity";
import { IKpiRepository } from "../../../../shared/modules/kpi/domain/repositories/kpi.repository.interface";
import { TimePeriod } from "src/shared/dto/kpi.dto";

export const WORKFLOW_REPOSITORY_TOKEN = "WorkflowRepository";
 
export interface WorkflowRepository extends IKpiRepository {
  findAll(): Promise<Workflow[]>;
  findById(id: number): Promise<Workflow | null>;
  getRevenueKpi(timePeriod: TimePeriod): Promise<{
    currentCount: number;
    previousCount: number;
  }>;
} 
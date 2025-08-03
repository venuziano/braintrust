import { Workflow } from "../entities/workflow.entity";
import { IKpiRepository } from "../../../../shared/modules/kpi/domain/repositories/kpi.repository.interface";

export const WORKFLOW_REPOSITORY_TOKEN = "WorkflowRepository";
 
export interface WorkflowRepository extends IKpiRepository {
  findAll(): Promise<Workflow[]>;
  findById(id: number): Promise<Workflow | null>;
} 
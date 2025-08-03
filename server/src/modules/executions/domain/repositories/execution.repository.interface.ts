import { Execution } from "../entities/execution.entity";
import { IKpiRepository } from "../../../../shared/modules/kpi/domain/repositories/kpi.repository.interface";

export const EXECUTION_REPOSITORY_TOKEN = "ExecutionRepository";
 
export interface ExecutionRepository extends IKpiRepository {
  findAll(): Promise<Execution[]>;
  findById(id: number): Promise<Execution | null>;
} 
import { Execution } from "../entities/execution.entity";

export const EXECUTION_REPOSITORY_TOKEN = "ExecutionRepository";
 
export interface ExecutionRepository {
  findAll(): Promise<Execution[]>;
  findById(id: number): Promise<Execution | null>;
} 
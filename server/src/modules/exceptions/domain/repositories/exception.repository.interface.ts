import { Exception } from "../entities/exception.entity";
import { IKpiRepository } from "../../../../shared/modules/kpi/domain/repositories/kpi.repository.interface";

export const EXCEPTION_REPOSITORY_TOKEN = "ExceptionRepository";
 
export interface ExceptionRepository extends IKpiRepository {
  findAll(): Promise<Exception[]>;
  findById(id: number): Promise<Exception | null>;
} 
import { Exception } from "../entities/exception.entity";

export const EXCEPTION_REPOSITORY_TOKEN = "ExceptionRepository";
 
export interface ExceptionRepository {
  findAll(): Promise<Exception[]>;
  findById(id: number): Promise<Exception | null>;
} 
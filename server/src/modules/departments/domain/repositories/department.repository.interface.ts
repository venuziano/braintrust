import { Department } from "../entities/department.entity";

export const DEPARTMENT_REPOSITORY_TOKEN = "DepartmentRepository";

export interface DepartmentRepository {
  findAll(): Promise<Department[]>;
  findById(id: number): Promise<Department | null>;
} 
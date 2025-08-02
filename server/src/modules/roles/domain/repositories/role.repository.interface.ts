import { Role } from '../entities/role.entity';

export const ROLE_REPOSITORY_TOKEN = 'RoleRepository';

export interface RoleRepository {
  findAll(): Promise<Role[]>;
  findById(id: number): Promise<Role | null>;
} 
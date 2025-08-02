import { User } from '../../../users/domain/entities/user.entity';
import { Role } from '../../../roles/domain/entities/role.entity';

export const AUTH_REPOSITORY_TOKEN = 'AuthRepository';

export interface AuthRepository {
  findUserByEmail(email: string): Promise<User | null>;
  findUserRoles(userId: number): Promise<Role[]>;
} 
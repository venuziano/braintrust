import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SolutionsEngineerProfileRepository } from '../../domain/repositories/solutions-engineer-profile.repository.interface';
import { SolutionsEngineerProfile } from '../../domain/entities/solutions-engineer-profile.entity';
import { SeAssignmentSchema } from '../typeorm/se-assignment.schema';
import { UserSchema } from '../../../users/infrastructure/typeorm/user.schema';
import { UserRoleSchema } from '../../../users/infrastructure/typeorm/user-role.schema';
import { RoleSchema } from '../../../roles/infrastructure/typeorm/role.schema';

interface SeAssignmentResult {
  se_name: string;
  se_email: string;
}

@Injectable()
export class TypeOrmSolutionsEngineerProfileRepository implements SolutionsEngineerProfileRepository {
  constructor(
    @InjectRepository(SeAssignmentSchema)
    private readonly seAssignmentsRepo: Repository<SeAssignmentSchema>,
    @InjectRepository(UserSchema)
    private readonly usersRepo: Repository<UserSchema>,
    @InjectRepository(UserRoleSchema)
    private readonly userRolesRepo: Repository<UserRoleSchema>,
    @InjectRepository(RoleSchema)
    private readonly rolesRepo: Repository<RoleSchema>,
  ) {}

  async getSolutionsEngineerByClientId(clientId: number): Promise<SolutionsEngineerProfile | null> {
    const result = await this.seAssignmentsRepo
      .createQueryBuilder('sa')
      .leftJoin('users', 'u', 'sa.se_id = u.id')
      .leftJoin('user_roles', 'ur', 'u.id = ur.user_id')
      .leftJoin('roles', 'r', 'ur.role_id = r.id')
      .select([
        'u.name as se_name',
        'u.email as se_email'
      ])
      .where('sa.client_id = :clientId', { clientId })
      .andWhere('r.name = :roleName', { roleName: 'Solutions Engineer' })
      .andWhere('sa.deleted_at IS NULL')
      .andWhere('u.deleted_at IS NULL')
      .getRawOne<SeAssignmentResult>();

    if (!result) {
      return null;
    }

    return SolutionsEngineerProfile.fromProps({
      name: result.se_name,
      email: result.se_email,
    });
  }
} 
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSchema } from '../../../users/infrastructure/typeorm/user.schema';
import { RoleSchema } from '../../../roles/infrastructure/typeorm/role.schema';
import { User } from '../../../users/domain/entities/user.entity';
import { Role } from '../../../roles/domain/entities/role.entity';
import { AUTH_REPOSITORY_TOKEN, AuthRepository } from '../../domain/repositories/auth.repository.interface';

@Injectable()
export class TypeOrmAuthRepository implements AuthRepository {
  constructor(
    @InjectRepository(UserSchema)
    private readonly userRepo: Repository<UserSchema>,
    @InjectRepository(RoleSchema)
    private readonly roleRepo: Repository<RoleSchema>,
  ) {}

  async findUserByEmail(email: string): Promise<User | null> {
    const userSchema = await this.userRepo.findOne({
      where: { email },
    });

    if (!userSchema) {
      return null;
    }

    return User.fromProps({
      id: userSchema.id,
      name: userSchema.name,
      email: userSchema.email,
      phone: userSchema.phone,
      passwordHash: userSchema.password_hash,
      createdAt: userSchema.created_at,
      updatedAt: userSchema.updated_at,
      deletedAt: userSchema.deleted_at,
    });
  }

  async findUserRoles(userId: number): Promise<Role[]> {
    // Query to get user roles through the user_roles junction table
    const result = await this.userRepo
      .createQueryBuilder('user')
      .leftJoin('user_roles', 'ur', 'ur.user_id = user.id')
      .leftJoin('roles', 'role', 'role.id = ur.role_id')
      .select(['role.id', 'role.name'])
      .where('user.id = :userId', { userId })
      .getRawMany();

    return result.map(row => new Role({
      id: row.role_id,
      name: row.role_name,
    }));
  }
} 
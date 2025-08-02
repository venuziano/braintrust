import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ROLE_REPOSITORY_TOKEN, RoleRepository } from '../../domain/repositories/role.repository.interface';
import { Role } from '../../domain/entities/role.entity';
import { RoleSchema } from '../typeorm/role.schema';

@Injectable()
export class TypeOrmRoleRepository implements RoleRepository {
  constructor(
    @InjectRepository(RoleSchema)
    private readonly repo: Repository<RoleSchema>,
  ) {}

  async findAll(): Promise<Role[]> {
    const schemas = await this.repo.find();
    return schemas.map((s) => new Role({ id: s.id, name: s.name }));
  }

  async findById(id: number): Promise<Role | null> {
    const s = await this.repo.findOne({ where: { id } });
    return s ? new Role({ id: s.id, name: s.name }) : null;
  }
} 
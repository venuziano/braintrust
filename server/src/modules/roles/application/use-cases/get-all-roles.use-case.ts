import { Injectable, Inject } from '@nestjs/common';
import { ROLE_REPOSITORY_TOKEN, RoleRepository } from '../../domain/repositories/role.repository.interface';
import { GetAllRolesResponse, RoleResponse } from '../dto/get-all-roles.dto';

@Injectable()
export class GetAllRolesUseCase {
  constructor(
    @Inject(ROLE_REPOSITORY_TOKEN)
    private readonly roleRepo: RoleRepository,
  ) {}

  async execute(): Promise<GetAllRolesResponse> {
    // TODO: implement fetching from repository and mapping to DTOs
    const roles = await this.roleRepo.findAll();
    return roles.map((r): RoleResponse => ({ id: r.id, name: r.name }));
  }
} 
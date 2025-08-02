import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleSchema } from './infrastructure/typeorm/role.schema';
import { TypeOrmRoleRepository } from './infrastructure/repositories/typeorm-role.repository';
import { ROLE_REPOSITORY_TOKEN } from './domain/repositories/role.repository.interface';
import { GetAllRolesUseCase } from './application/use-cases/get-all-roles.use-case';
import { RolesController } from './roles.controller';


@Module({
  imports: [TypeOrmModule.forFeature([RoleSchema])],
  providers: [
    RolesController,
    GetAllRolesUseCase,
    {
      provide: ROLE_REPOSITORY_TOKEN,
      useClass: TypeOrmRoleRepository,
    },
  ],
  exports: [GetAllRolesUseCase, RolesController],
})
export class RolesModule {} 
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeAssignmentSchema } from './infrastructure/typeorm/se-assignment.schema';
import { UserRoleSchema } from '../users/infrastructure/typeorm/user-role.schema';
import { UserSchema } from '../users/infrastructure/typeorm/user.schema';
import { RoleSchema } from '../roles/infrastructure/typeorm/role.schema';
import { GetSolutionsEngineerProfileUseCase } from './application/use-cases/get-solutions-engineer-profile.use-case';
import { SolutionsEngineerController } from './solutions-engineer.controller';
import { TypeOrmSolutionsEngineerProfileRepository } from './infrastructure/repositories/typeorm-solutions-engineer-profile.repository';
import { SOLUTIONS_ENGINEER_PROFILE_REPOSITORY_TOKEN } from './domain/repositories/solutions-engineer-profile.repository.interface';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SeAssignmentSchema,
      UserRoleSchema,
      UserSchema,
      RoleSchema,
    ]),
  ],
  providers: [
    GetSolutionsEngineerProfileUseCase,
    SolutionsEngineerController,
    {
      provide: SOLUTIONS_ENGINEER_PROFILE_REPOSITORY_TOKEN,
      useClass: TypeOrmSolutionsEngineerProfileRepository,
    },
  ],
  exports: [SolutionsEngineerController],
})
export class SolutionsEngineerModule {} 
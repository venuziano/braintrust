import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentSchema } from './infrastructure/typeorm/department.schema';
import { TypeOrmDepartmentRepository } from './infrastructure/repositories/typeorm-department.repository';
import { DEPARTMENT_REPOSITORY_TOKEN } from './domain/repositories/department.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([DepartmentSchema])],
  providers: [
    { provide: DEPARTMENT_REPOSITORY_TOKEN, useClass: TypeOrmDepartmentRepository },
  ],
  exports: [TypeOrmModule],
})
export class DepartmentsModule {} 
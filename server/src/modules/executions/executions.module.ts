import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExecutionSchema } from './infrastructure/typeorm/execution.schema';
import { TypeOrmExecutionRepository } from './infrastructure/repositories/typeorm-execution.repository';
import { EXECUTION_REPOSITORY_TOKEN } from './domain/repositories/execution.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([ExecutionSchema])],
  providers: [
    { provide: EXECUTION_REPOSITORY_TOKEN, useClass: TypeOrmExecutionRepository },
  ],
  exports: [TypeOrmModule],
})
export class ExecutionsModule {} 
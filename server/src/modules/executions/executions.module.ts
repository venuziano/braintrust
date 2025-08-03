import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExecutionSchema } from './infrastructure/typeorm/execution.schema';
import { TypeOrmExecutionRepository } from './infrastructure/repositories/typeorm-execution.repository';
import { EXECUTION_REPOSITORY_TOKEN } from './domain/repositories/execution.repository.interface';
import { GetTotalTimeSavedKpiUseCase } from './application/use-cases/get-total-time-saved-kpi.use-case';
import { ExecutionsController } from './executions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ExecutionSchema])],
  providers: [
    { provide: EXECUTION_REPOSITORY_TOKEN, useClass: TypeOrmExecutionRepository },
    GetTotalTimeSavedKpiUseCase,
    ExecutionsController,
  ],
  exports: [EXECUTION_REPOSITORY_TOKEN, ExecutionsController],
})
export class ExecutionsModule {} 
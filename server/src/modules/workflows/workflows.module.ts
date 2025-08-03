import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkflowSchema } from './infrastructure/typeorm/workflow.schema';
import { TypeOrmWorkflowRepository } from './infrastructure/repositories/typeorm-workflow.repository';
import { WorkflowsController } from './workflows.controller';
import { GetTotalWorkflowsKpiUseCase } from './application/use-cases/get-total-workflows-kpi.use-case';
import { WORKFLOW_REPOSITORY_TOKEN } from './domain/repositories/workflow.repository.interface';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkflowSchema]),
  ],
  providers: [
    {
      provide: WORKFLOW_REPOSITORY_TOKEN,
      useClass: TypeOrmWorkflowRepository,
    },
    GetTotalWorkflowsKpiUseCase,
    WorkflowsController,
  ],
  exports: [WORKFLOW_REPOSITORY_TOKEN, WorkflowsController],
})
export class WorkflowsModule {} 
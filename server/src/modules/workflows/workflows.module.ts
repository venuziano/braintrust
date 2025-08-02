import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkflowSchema } from './infrastructure/typeorm/workflow.schema';
import { TypeOrmWorkflowRepository } from './infrastructure/repositories/typeorm-workflow.repository';
import { WORKFLOW_REPOSITORY_TOKEN } from './domain/repositories/workflow.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([WorkflowSchema])],
  providers: [
    { provide: WORKFLOW_REPOSITORY_TOKEN, useClass: TypeOrmWorkflowRepository },
  ],
  exports: [TypeOrmModule],
})
export class WorkflowsModule {} 
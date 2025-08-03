import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PipelineProgressSchema } from './infrastructure/typeorm/pipeline-progress.schema';
import { PipelinePhaseSchema } from './infrastructure/typeorm/pipeline-phase.schema';
import { PipelineController } from './pipeline.controller';
import { GetClientPipelineProgressUseCase } from './application/use-cases/get-client-pipeline-progress.use-case';
import { TypeOrmPipelineProgressRepository } from './infrastructure/repositories/typeorm-pipeline-progress.repository';
import { PIPELINE_PROGRESS_REPOSITORY_TOKEN } from './domain/repositories/pipeline-progress.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([PipelineProgressSchema, PipelinePhaseSchema])],
  providers: [
    PipelineController,
    GetClientPipelineProgressUseCase,
    { provide: PIPELINE_PROGRESS_REPOSITORY_TOKEN, useClass: TypeOrmPipelineProgressRepository },
  ],
  exports: [PipelineController],
})
export class PipelineModule {} 
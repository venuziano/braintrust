import { Injectable, Inject } from '@nestjs/common';
import { PIPELINE_PROGRESS_REPOSITORY_TOKEN, PipelineProgressRepository } from '../../domain/repositories/pipeline-progress.repository.interface';
import { GetClientPipelineProgressRequest, GetClientPipelineProgressResponse } from '../dto/get-client-pipeline-progress.dto';

@Injectable()
export class GetClientPipelineProgressUseCase {
  constructor(
    @Inject(PIPELINE_PROGRESS_REPOSITORY_TOKEN) 
    private readonly pipelineProgressRepo: PipelineProgressRepository
  ) {}

  async execute(clientId: number): Promise<GetClientPipelineProgressResponse> {
    const pipelineProgress = await this.pipelineProgressRepo.getClientPipelineProgress(clientId);
    
    return {
      clientId,
      pipelineProgress: pipelineProgress.map(progress => ({
        phaseName: progress.phaseName,
        status: progress.status,
        completedAt: progress.completedAt || null,
        order: progress.phaseOrder,
      })).sort((a, b) => a.order - b.order),
    };
  }
} 
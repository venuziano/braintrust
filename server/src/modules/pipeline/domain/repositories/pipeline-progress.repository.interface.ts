import { PipelineProgress } from '../entities/pipeline-progress.entity';

export const PIPELINE_PROGRESS_REPOSITORY_TOKEN = 'PipelineProgressRepository';

export interface PipelineProgressRepository {
  getClientPipelineProgress(clientId: number): Promise<PipelineProgress[]>;
} 
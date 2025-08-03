import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PipelineProgressSchema } from '../typeorm/pipeline-progress.schema';
import { PipelineProgressRepository } from '../../domain/repositories/pipeline-progress.repository.interface';
import { PipelineProgress } from '../../domain/entities/pipeline-progress.entity';

@Injectable()
export class TypeOrmPipelineProgressRepository implements PipelineProgressRepository {
  constructor(
    @InjectRepository(PipelineProgressSchema)
    private readonly repo: Repository<PipelineProgressSchema>,
  ) {}

  async getClientPipelineProgress(clientId: number): Promise<PipelineProgress[]> {
    const results = await this.repo
      .createQueryBuilder('progress')
      .leftJoin('progress.pipelinePhase', 'phase')
      .select([
        'progress.client_id',
        'progress.pipeline_phase_id',
        'progress.status',
        'progress.completed_at',
        'phase.name',
        'phase.phase_order'
      ])
      .where('progress.client_id = :clientId', { clientId })
      .orderBy('phase.phase_order', 'ASC')
      .getRawMany<{
        progress_client_id: number;
        progress_pipeline_phase_id: number;
        progress_status: 'not_started' | 'in_progress' | 'completed';
        progress_completed_at: Date | null;
        phase_name: string;
        phase_order: number;
      }>();

    return results.map(result => PipelineProgress.fromProps({
      clientId: result.progress_client_id,
      pipelinePhaseId: result.progress_pipeline_phase_id,
      status: result.progress_status,
      completedAt: result.progress_completed_at || undefined,
      phaseName: result.phase_name,
      phaseOrder: result.phase_order,
    }));
  }
} 
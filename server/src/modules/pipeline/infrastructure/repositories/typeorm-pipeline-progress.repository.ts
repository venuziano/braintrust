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
      .leftJoinAndSelect('progress.pipelinePhase', 'phase')
      .where('progress.client_id = :clientId', { clientId })
      .orderBy('phase.order', 'ASC')
      .getMany();

    return results.map(result => PipelineProgress.fromProps({
      clientId: result.client_id,
      pipelinePhaseId: result.pipeline_phase_id,
      status: result.status,
      completedAt: result.completed_at || undefined,
      phaseName: result.pipelinePhase.name,
      phaseOrder: result.pipelinePhase.order,
    }));
  }
} 
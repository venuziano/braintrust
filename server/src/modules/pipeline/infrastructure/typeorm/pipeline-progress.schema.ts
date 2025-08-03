import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseSchema } from '../../../../shared/entities/base.schema';
import { ClientSchema } from '../../../clients/infrastructure/typeorm/client.schema';
import { PipelinePhaseSchema } from './pipeline-phase.schema';

@Entity('client_pipeline_progress')
export class PipelineProgressSchema extends BaseSchema {
  @PrimaryColumn()
  client_id: number;

  @PrimaryColumn()
  pipeline_phase_id: number;

  @Column({
    type: 'enum',
    enum: ['not_started', 'in_progress', 'completed'],
    default: 'not_started'
  })
  status: 'not_started' | 'in_progress' | 'completed';

  @Column({ type: 'timestamptz', nullable: true })
  completed_at: Date | null;

  @ManyToOne(() => ClientSchema)
  @JoinColumn({ name: 'client_id' })
  client: ClientSchema;

  @ManyToOne(() => PipelinePhaseSchema)
  @JoinColumn({ name: 'pipeline_phase_id' })
  pipelinePhase: PipelinePhaseSchema;
} 
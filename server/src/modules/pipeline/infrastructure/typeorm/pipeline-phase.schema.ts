import { Entity, Column } from 'typeorm';
import { BaseSchema } from '../../../../shared/entities/base.schema';

@Entity('pipeline_phases')
export class PipelinePhaseSchema extends BaseSchema {
  @Column()
  name: string;

  @Column({ name: 'phase_order' })
  order: number;

  @Column({ type: 'text', nullable: true })
  description: string | null;
} 
import { Entity, Column, PrimaryColumn } from 'typeorm';
import { BaseSchema } from '../../../../shared/entities/base.schema';

@Entity('se_assignments')
export class SeAssignmentSchema extends BaseSchema {
  @PrimaryColumn()
  se_id: number;

  @PrimaryColumn()
  client_id: number;
} 
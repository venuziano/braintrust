import { Entity, PrimaryColumn } from 'typeorm';
import { BaseSchema } from '../../../../shared/entities/base.schema';

@Entity('user_roles')
export class UserRoleSchema extends BaseSchema {
  @PrimaryColumn()
  user_id: number;

  @PrimaryColumn()
  role_id: number;
} 
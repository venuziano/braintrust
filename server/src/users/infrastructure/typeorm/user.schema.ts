import { Entity, Column } from 'typeorm';
import { BaseSchema } from '../../../shared/entities/base.schema';

/**
 * TypeORM entity representing the users table in the database
 * Extends BaseSchema for common audit fields and soft deletion
 */
@Entity('users')
export class UserSchema extends BaseSchema {
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  phone: string | null;

  @Column({ type: 'text', nullable: false })
  password_hash: string;
} 
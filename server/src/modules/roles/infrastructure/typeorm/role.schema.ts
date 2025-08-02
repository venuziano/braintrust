import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('roles')
export class RoleSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
} 
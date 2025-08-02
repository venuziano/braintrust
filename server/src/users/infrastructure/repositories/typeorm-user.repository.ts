import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { User } from '../../domain/entities/user.entity';
import { UserRepositoryInterface } from '../../domain/repositories/user.repository.interface';
import { UserSchema } from '../typeorm/user.schema';

/**
 * TypeORM implementation of the UserRepositoryInterface
 */
@Injectable()
export class TypeOrmUserRepository implements UserRepositoryInterface {
  constructor(
    @InjectRepository(UserSchema)
    private readonly userRepository: Repository<UserSchema>,
  ) {}

  /**
   * Retrieves all active users from the database (not soft deleted)
   */
  async findAll(): Promise<User[]> {
    const userSchemas = await this.userRepository.find({
      where: { deleted_at: IsNull() },
      order: { created_at: 'DESC' },
    });

    return userSchemas.map(this.toDomainEntity);
  }

  /**
   * Finds an active user by their unique identifier
   */
  async findById(id: number): Promise<User | null> {
    const userSchema = await this.userRepository.findOne({
      where: { id, deleted_at: IsNull() },
    });

    return userSchema ? this.toDomainEntity(userSchema) : null;
  }

  /**
   * Finds an active user by their email address
   */
  async findByEmail(email: string): Promise<User | null> {
    const userSchema = await this.userRepository.findOne({
      where: { email, deleted_at: IsNull() },
    });

    return userSchema ? this.toDomainEntity(userSchema) : null;
  }

  /**
   * Saves a user to the database
   */
  async save(user: User): Promise<User> {
    const userSchema = this.toSchema(user);
    const savedSchema = await this.userRepository.save(userSchema);
    return this.toDomainEntity(savedSchema);
  }

  /**
   * Soft deletes a user from the database
   */
  async delete(id: number): Promise<void> {
    await this.userRepository.softDelete(id);
  }

  /**
   * Converts TypeORM schema to domain entity
   */
  private toDomainEntity(schema: UserSchema): User {
    return User.fromProps({
      id: schema.id,
      name: schema.name,
      email: schema.email,
      phone: schema.phone,
      passwordHash: schema.password_hash,
      createdAt: schema.created_at,
      updatedAt: schema.updated_at,
      deletedAt: schema.deleted_at,
    });
  }

  /**
   * Converts domain entity to TypeORM schema
   */
  private toSchema(user: User): UserSchema {
    const schema = new UserSchema();
    const props = user.toProps();

    if (props.id > 0) {
      schema.id = props.id;
    }
    schema.name = props.name;
    schema.email = props.email;
    schema.phone = props.phone;
    schema.password_hash = props.passwordHash;

    if (props.createdAt) {
      schema.created_at = props.createdAt;
    }
    if (props.updatedAt) {
      schema.updated_at = props.updatedAt;
    }
    if (props.deletedAt) {
      schema.deleted_at = props.deletedAt;
    }

    return schema;
  }
} 
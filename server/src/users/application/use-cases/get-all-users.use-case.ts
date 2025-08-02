import { Injectable, Inject } from '@nestjs/common';
import { UserRepositoryInterface, USER_REPOSITORY_TOKEN } from '../../domain/repositories/user.repository.interface';
import { User } from '../../domain/entities/user.entity';
import { GetAllUsersResponse, UserResponse } from '../dto/get-all-users.dto';

/**
 * Use case for retrieving all users
 * Encapsulates business logic for the get all users operation
 */
@Injectable()
export class GetAllUsersUseCase {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  /**
   * Executes the get all users use case
   * @returns Promise<GetAllUsersResponse> Array of user response objects
   */
  async execute(): Promise<GetAllUsersResponse> {
    const users = await this.userRepository.findAll();
    return users.map(this.mapToResponse);
  }

  /**
   * Maps domain entity to response DTO
   * @param user - The user domain entity
   * @returns UserResponse - The user response object
   */
  private mapToResponse(user: User): UserResponse {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
    };
  }
} 
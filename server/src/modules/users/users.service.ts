import { Injectable } from '@nestjs/common';
import { GetAllUsersUseCase } from './application/use-cases/get-all-users.use-case';
import { GetAllUsersResponse } from './application/dto/get-all-users.dto';

/**
 * Users service that orchestrates use cases
 * Acts as the application service layer
 */
@Injectable()
export class UsersService {
  constructor(
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
  ) {}

  /**
   * Retrieves all users
   * @returns Promise<GetAllUsersResponse> Array of user response objects
   */
  async getAllUsers(): Promise<GetAllUsersResponse> {
    return this.getAllUsersUseCase.execute();
  }
} 
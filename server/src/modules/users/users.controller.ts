import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { GetAllUsersResponseSchema } from './application/dto/get-all-users.dto';
import { t } from '../../infrastructure/trpc/trpc.shared';

/**
 * Users controller with tRPC procedures
 */
@Injectable()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Creates the users tRPC router
   */
  createRouter() {
    return t.router({
      getAll: t.procedure
        .output(GetAllUsersResponseSchema)
        .query(async () => {
          return this.usersService.getAllUsers();
        }),
    });
  }
} 
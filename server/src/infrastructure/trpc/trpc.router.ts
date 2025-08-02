import { Injectable } from '@nestjs/common';
import { initTRPC } from '@trpc/server';

import { RolesController } from '../../modules/roles/roles.controller';
import { UsersController } from 'src/modules/users/users.controller';

/**
 * Main tRPC instance
 */
const t = initTRPC.create();

/**
 * Main tRPC router that combines all domain routers
 */
@Injectable()
export class TrpcRouter {
  constructor(private readonly usersController: UsersController, private readonly rolesController: RolesController) {}

  /**
   * Creates the main application router
   */
  createRouter() {
    return t.router({
      users: this.usersController.createRouter(),
      roles: this.rolesController.createRouter(),
    });
  }
}

/**
 * Type definition for the app router
 */
export type AppRouter = ReturnType<TrpcRouter['createRouter']>; 
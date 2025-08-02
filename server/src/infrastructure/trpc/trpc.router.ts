import { Injectable } from '@nestjs/common';
import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { RolesController } from '../../modules/roles/roles.controller';
import { UsersController } from 'src/modules/users/users.controller';
import { ClientsController } from '../../modules/clients/clients.controller';
import { WorkflowsController } from '../../modules/workflows/workflows.controller';
import { AuthController } from '../../modules/auth/auth.controller';

/**
 * Main tRPC instance
 */
const t = initTRPC.create({ transformer: superjson });

/**
 * Main tRPC router that combines all domain routers
 */
@Injectable()
export class TrpcRouter {
  constructor(
    private readonly usersController: UsersController,
    private readonly rolesController: RolesController,
    private readonly clientsController: ClientsController,
    private readonly workflowsController: WorkflowsController,
    private readonly authController: AuthController,
  ) {}

  /**
   * Creates the main application router
   */
  createRouter() {
    return t.router({
      users: this.usersController.createRouter(),
      roles: this.rolesController.createRouter(),
      clients: this.clientsController.createRouter(),
      workflows: this.workflowsController.createRouter(),
      auth: this.authController.createRouter(),
    });
  }
}

/**
 * Type definition for the app router
 */
export type AppRouter = ReturnType<TrpcRouter['createRouter']>;

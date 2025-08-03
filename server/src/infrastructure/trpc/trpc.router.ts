import { Injectable } from '@nestjs/common';
import { RolesController } from '../../modules/roles/roles.controller';
import { UsersController } from 'src/modules/users/users.controller';
import { ClientsController } from '../../modules/clients/clients.controller';
import { WorkflowsController } from '../../modules/workflows/workflows.controller';
import { AuthController } from '../../modules/auth/auth.controller';
import { ExceptionsController } from '../../modules/exceptions/exceptions.controller';
import { ExecutionsController } from '../../modules/executions/executions.controller';
import { PipelineController } from '../../modules/pipeline/pipeline.controller';
import { ClientDashboardController } from '../../modules/client-dashboard/client-dashboard.controller';
import { SolutionsEngineerController } from '../../modules/solutions-engineer/solutions-engineer.controller';
import { t } from './trpc.shared';

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
    private readonly exceptionsController: ExceptionsController,
    private readonly executionsController: ExecutionsController,
    private readonly pipelineController: PipelineController,
    private readonly clientDashboardController: ClientDashboardController,
    private readonly solutionsEngineerController: SolutionsEngineerController,
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
      exceptions: this.exceptionsController.createRouter(),
      executions: this.executionsController.createRouter(),
      pipeline: this.pipelineController.createRouter(),
      clientDashboard: this.clientDashboardController.createRouter(),
      solutionsEngineer: this.solutionsEngineerController.createRouter(),
    });
  }
}

/**
 * Type definition for the app router
 */
export type AppRouter = ReturnType<TrpcRouter['createRouter']>;

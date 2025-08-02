import { Module } from '@nestjs/common';
import { TrpcRouter } from './trpc.router';

import { RolesModule } from '../../modules/roles/roles.module';
import { UsersModule } from 'src/modules/users/users.module';
import { ClientsModule } from '../../modules/clients/clients.module';
import { DepartmentsModule } from '../../modules/departments/departments.module';
import { WorkflowsModule } from '../../modules/workflows/workflows.module';
import { ExceptionsModule } from '../../modules/exceptions/exceptions.module';
import { ExceptionNotificationsModule } from '../../modules/exception-notifications/exception-notifications.module';
import { ExecutionsModule } from '../../modules/executions/executions.module';
import { NodesModule } from '../../modules/nodes/nodes.module';
import { AuthModule } from '../../modules/auth/auth.module';

/**
 * tRPC module that exports the main router
 */
@Module({
  imports: [
    UsersModule, 
    RolesModule, 
    ClientsModule, 
    DepartmentsModule, 
    WorkflowsModule, 
    ExceptionsModule, 
    ExceptionNotificationsModule, 
    ExecutionsModule, 
    NodesModule, 
    AuthModule
  ],
  providers: [TrpcRouter],
  exports: [TrpcRouter],
})
export class TrpcModule {} 
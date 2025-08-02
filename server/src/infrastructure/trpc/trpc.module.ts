import { Module } from '@nestjs/common';
import { TrpcRouter } from './trpc.router';

import { RolesModule } from '../../modules/roles/roles.module';
import { UsersModule } from 'src/modules/users/users.module';

/**
 * tRPC module that exports the main router
 */
@Module({
  imports: [UsersModule, RolesModule],
  providers: [TrpcRouter],
  exports: [TrpcRouter],
})
export class TrpcModule {} 
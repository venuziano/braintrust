import { Module } from '@nestjs/common';
import { TrpcRouter } from './trpc.router';
import { UsersModule } from '../users/users.module';

/**
 * tRPC module that exports the main router
 */
@Module({
  imports: [UsersModule],
  providers: [TrpcRouter],
  exports: [TrpcRouter],
})
export class TrpcModule {} 
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { GetAllUsersUseCase } from './application/use-cases/get-all-users.use-case';
import { USER_REPOSITORY_TOKEN } from './domain/repositories/user.repository.interface';
import { TypeOrmUserRepository } from './infrastructure/repositories/typeorm-user.repository';
import { UserSchema } from './infrastructure/typeorm/user.schema';

/**
 * Users module following DDD architecture
 */
@Module({
  imports: [TypeOrmModule.forFeature([UserSchema])],
  controllers: [],
  providers: [
    UsersController,
    UsersService,
    GetAllUsersUseCase,
    {
      provide: USER_REPOSITORY_TOKEN,
      useClass: TypeOrmUserRepository,
    },
  ],
  exports: [UsersService, UsersController],
})
export class UsersModule {} 
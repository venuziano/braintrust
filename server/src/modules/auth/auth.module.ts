import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from '../users/infrastructure/typeorm/user.schema';
import { RoleSchema } from '../roles/infrastructure/typeorm/role.schema';
import { TypeOrmAuthRepository } from './infrastructure/repositories/typeorm-auth.repository';
import { AuthController } from './auth.controller';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { AUTH_REPOSITORY_TOKEN } from './domain/repositories/auth.repository.interface';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserSchema, RoleSchema]),
  ],
  providers: [
    {
      provide: AUTH_REPOSITORY_TOKEN,
      useClass: TypeOrmAuthRepository,
    },
    LoginUseCase,
    AuthController,
  ],
  exports: [AUTH_REPOSITORY_TOKEN, AuthController],
})
export class AuthModule {} 
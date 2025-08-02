import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserSchema } from '../users/infrastructure/typeorm/user.schema';
import { RoleSchema } from '../roles/infrastructure/typeorm/role.schema';
import { TypeOrmAuthRepository } from './infrastructure/repositories/typeorm-auth.repository';
import { AuthController } from './auth.controller';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { AUTH_REPOSITORY_TOKEN } from './domain/repositories/auth.repository.interface';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserSchema, RoleSchema]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        // NOTE: It should be a secret key, but for now we're using a fixed key for testing
        secret: '4b5a6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5',
        signOptions: { expiresIn: '4h' },
      }),
      inject: [ConfigService],
    }),
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
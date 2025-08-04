import { Injectable } from '@nestjs/common';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { LoginRequestSchema, LoginResponseSchema } from './application/dto/login.dto';
import { t } from '../../infrastructure/trpc/trpc.shared';

@Injectable()
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
  ) {}

  createRouter() {
    return t.router({
      // Public procedure - no authentication required
      login: t.procedure
        .input(LoginRequestSchema)
        .output(LoginResponseSchema)
        .mutation(({ input }) => this.loginUseCase.execute(input)),
    });
  }
} 
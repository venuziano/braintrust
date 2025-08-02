import { Injectable } from '@nestjs/common';
import { initTRPC } from '@trpc/server';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { LoginRequestSchema, LoginResponseSchema } from './application/dto/login.dto';

const t = initTRPC.create();

@Injectable()
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  createRouter() {
    return t.router({
      login: t.procedure
        .input(LoginRequestSchema)
        .output(LoginResponseSchema)
        .mutation(({ input }) => this.loginUseCase.execute(input)),
    });
  }
} 
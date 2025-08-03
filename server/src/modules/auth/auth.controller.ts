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
      
      // Example of different protection levels (commented out for now)
      // getProfile: protectedProcedure.auth
      //   .query(({ ctx }) => ({ user: ctx.user })),
      // 
      // adminOnly: protectedProcedure.admin(this.jwtService)
      //   .query(({ ctx }) => ({ message: 'Admin only' })),
      // 
      // clientOnly: protectedProcedure.client(this.jwtService)
      //   .query(({ ctx }) => ({ message: 'Client only' })),
      // 
      // customRole: protectedProcedure.role({ 
      //   roles: ['Admin'], 
      //   message: 'Only admins can access this' 
      // })
      //   .query(({ ctx }) => ({ message: 'Custom role check' })),
    });
  }
} 
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GetSolutionsEngineerProfileUseCase } from './application/use-cases/get-solutions-engineer-profile.use-case';
import { GetSolutionsEngineerProfileResponseSchema } from './application/dto/get-solutions-engineer-profile.dto';
import { createProtectedProcedure, Role } from '../../infrastructure/trpc/trpc.middleware';
import { t } from '../../infrastructure/trpc/trpc.shared';

@Injectable()
export class SolutionsEngineerController {
  constructor(
    private readonly getSolutionsEngineerProfileUseCase: GetSolutionsEngineerProfileUseCase,
    private readonly jwtService: JwtService,
  ) {}

  createRouter() {
    const protectedProcedure = createProtectedProcedure(this.jwtService);
    
    return t.router({
      getSolutionsEngineerProfile: protectedProcedure.role({
            roles: [Role.Client, Role.SolutionsEngineer, Role.Admin],
            message: 'Client or Admin access required'
        })
        .output(GetSolutionsEngineerProfileResponseSchema.nullable())
        .query(async ({ ctx }) => {
          if (!ctx.user?.clientId) {
            throw new Error('Client ID not found in token');
          }
          
          return this.getSolutionsEngineerProfileUseCase.execute(ctx.user.clientId);
        }),
    });
  }
} 
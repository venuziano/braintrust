import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GetClientDashboardUseCase } from './application/use-cases/get-client-dashboard.use-case';
import { GetClientDashboardResponseSchema } from './application/dto/get-client-dashboard.dto';
import { createProtectedProcedure, Role } from '../../infrastructure/trpc/trpc.middleware';
import { t } from '../../infrastructure/trpc/trpc.shared';


@Injectable()
export class ClientDashboardController {
  constructor(
    private readonly getClientDashboardUseCase: GetClientDashboardUseCase,
    private readonly jwtService: JwtService,
  ) {}

  createRouter() {
    const protectedProcedure = createProtectedProcedure(this.jwtService);
    
    return t.router({
      getClientDashboard: protectedProcedure.role({
          roles: [Role.Client, Role.SolutionsEngineer, Role.Admin],
          message: 'Client or Admin access required'
        })
        .output(GetClientDashboardResponseSchema)
        .query(async ({ ctx }) => {
          if (!ctx.user?.clientId) {
            throw new Error('Client ID not found in token');
          }
          
          return this.getClientDashboardUseCase.execute(ctx.user.clientId);
        }),
    });
  }
} 
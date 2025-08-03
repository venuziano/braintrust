import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GetTotalTimeSavedKpiUseCase } from './application/use-cases/get-total-time-saved-kpi.use-case';
import { KpiRequestSchema, KpiResponseSchema } from '../../shared/dto/kpi.dto';
import { createProtectedProcedure } from '../../infrastructure/trpc/trpc.middleware';
import { t } from '../../infrastructure/trpc/trpc.shared';

@Injectable()
export class ExecutionsController {
  constructor(
    private readonly getTotalTimeSavedKpiUseCase: GetTotalTimeSavedKpiUseCase,
    private readonly jwtService: JwtService,
  ) {}

  createRouter() {
    const protectedProcedure = createProtectedProcedure(this.jwtService);
    
    return t.router({
      getTotalTimeSavedKpi: protectedProcedure.admin(this.jwtService)
        .input(KpiRequestSchema)
        .output(KpiResponseSchema)
        .query(({ input }) => this.getTotalTimeSavedKpiUseCase.execute(input)),
    });
  }
} 
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GetTotalExceptionsKpiUseCase } from './application/use-cases/get-total-exceptions-kpi.use-case';
import { KpiRequestSchema, KpiResponseSchema } from '../../shared/dto/kpi.dto';
import { createProtectedProcedure } from '../../infrastructure/trpc/trpc.middleware';
import { t } from '../../infrastructure/trpc/trpc.shared';

@Injectable()
export class ExceptionsController {
  constructor(
    private readonly getTotalExceptionsKpiUseCase: GetTotalExceptionsKpiUseCase,
    private readonly jwtService: JwtService,
  ) {}

  createRouter() {
    const protectedProcedure = createProtectedProcedure(this.jwtService);
    
    return t.router({
      getTotalExceptionsKpi: protectedProcedure.admin(this.jwtService)
        .input(KpiRequestSchema)
        .output(KpiResponseSchema)
        .query(({ input }) => this.getTotalExceptionsKpiUseCase.execute(input)),
    });
  }
} 
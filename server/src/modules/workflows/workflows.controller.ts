import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GetTotalWorkflowsKpiUseCase } from './application/use-cases/get-total-workflows-kpi.use-case';
import { KpiRequestSchema, KpiResponseSchema } from '../../shared/dto/kpi.dto';
import { createProtectedProcedure } from '../../infrastructure/trpc/trpc.middleware';
import { t } from '../../infrastructure/trpc/trpc.shared';

@Injectable()
export class WorkflowsController {
  constructor(
    private readonly getTotalWorkflowsKpiUseCase: GetTotalWorkflowsKpiUseCase,
    private readonly jwtService: JwtService,
  ) {}

  createRouter() {
    const protectedProcedure = createProtectedProcedure(this.jwtService);
    
    return t.router({
      getTotalWorkflowsKpi: protectedProcedure.admin(this.jwtService)
        .input(KpiRequestSchema)
        .output(KpiResponseSchema)
        .query(({ input }) => this.getTotalWorkflowsKpiUseCase.execute(input)),
    });
  }
}
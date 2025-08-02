import { Injectable } from '@nestjs/common';
import { initTRPC } from '@trpc/server';
import { GetTotalWorkflowsKpiUseCase } from './application/use-cases/get-total-workflows-kpi.use-case';
import { GetTotalWorkflowsKpiRequestSchema, GetTotalWorkflowsKpiResponseSchema } from './application/dto/get-total-workflows-kpi.dto';

const t = initTRPC.create();

@Injectable()
export class WorkflowsController {
  constructor(private readonly getTotalWorkflowsKpiUseCase: GetTotalWorkflowsKpiUseCase) {}

  createRouter() {
    return t.router({
      getTotalWorkflowsKpi: t.procedure
        .input(GetTotalWorkflowsKpiRequestSchema)
        .output(GetTotalWorkflowsKpiResponseSchema)
        .query(({ input }) => this.getTotalWorkflowsKpiUseCase.execute(input)),
    });
  }
}
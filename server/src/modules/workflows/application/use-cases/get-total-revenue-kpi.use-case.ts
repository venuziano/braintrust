import { Injectable, Inject } from '@nestjs/common';
import { BaseKpiUseCase } from '../../../../shared/modules/kpi/application/use-cases/base-kpi.use-case';
import { KpiRequest, KpiResponse } from '../../../../shared/dto/kpi.dto';
import {
  WORKFLOW_REPOSITORY_TOKEN,
  WorkflowRepository,
} from '../../domain/repositories/workflow.repository.interface';

@Injectable()
export class GetTotalRevenueKpiUseCase extends BaseKpiUseCase {
  constructor(
    @Inject(WORKFLOW_REPOSITORY_TOKEN)
    private readonly workflowRepo: WorkflowRepository,
  ) {
    super(workflowRepo);
  }

  async execute(request: KpiRequest): Promise<KpiResponse> {
    // Override the executeBase to use getRevenueKpi instead of getKpi
    const { currentCount, previousCount } = await this.workflowRepo.getRevenueKpi(request.timePeriod);
    
    const changePercentage = previousCount === 0 
      ? currentCount > 0 ? 100 : 0
      : ((currentCount - previousCount) / previousCount) * 100;
    
    const changeDirection = changePercentage >= 0 ? 'up' : 'down';
    
    return {
      label: 'Revenue',
      value: Math.round(currentCount * 100) / 100, // Round to 2 decimal places
      changePercentage: Math.round(Math.abs(changePercentage) * 100) / 100,
      changeDirection,
      timePeriod: request.timePeriod,
    };
  }
}
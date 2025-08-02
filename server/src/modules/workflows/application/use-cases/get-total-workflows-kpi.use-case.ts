import { Injectable, Inject } from '@nestjs/common';
import { GetTotalWorkflowsKpiRequest, GetTotalWorkflowsKpiResponse, TimePeriod } from '../dto/get-total-workflows-kpi.dto';
import {
  WORKFLOW_REPOSITORY_TOKEN,
  WorkflowRepository,
} from '../../domain/repositories/workflow.repository.interface';

@Injectable()
export class GetTotalWorkflowsKpiUseCase {
  constructor(
    @Inject(WORKFLOW_REPOSITORY_TOKEN)
    private readonly workflowRepo: WorkflowRepository,
  ) {}

  async execute(request: GetTotalWorkflowsKpiRequest): Promise<GetTotalWorkflowsKpiResponse> {
    const { currentCount, previousCount } = await this.workflowRepo.getTotalWorkflowsKpi(request.timePeriod);
    
    const changePercentage = previousCount === 0 
      ? currentCount > 0 ? 100 : 0
      : ((currentCount - previousCount) / previousCount) * 100;
    
    const changeDirection = changePercentage >= 0 ? 'up' : 'down';
    
    return {
      label: 'Total Workflows',
      value: currentCount,
      changePercentage: Math.round(Math.abs(changePercentage) * 100) / 100, // Round to 2 decimal places
      changeDirection,
      timePeriod: request.timePeriod,
    };
  }
} 
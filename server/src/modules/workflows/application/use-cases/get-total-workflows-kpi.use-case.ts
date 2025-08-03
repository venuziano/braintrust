import { Injectable, Inject } from '@nestjs/common';
import { BaseKpiUseCase } from '../../../../shared/modules/kpi/application/use-cases/base-kpi.use-case';
import { KpiRequest, KpiResponse } from '../../../../shared/dto/kpi.dto';
import {
  WORKFLOW_REPOSITORY_TOKEN,
  WorkflowRepository,
} from '../../domain/repositories/workflow.repository.interface';

@Injectable()
export class GetTotalWorkflowsKpiUseCase extends BaseKpiUseCase {
  constructor(
    @Inject(WORKFLOW_REPOSITORY_TOKEN)
    private readonly workflowRepo: WorkflowRepository,
  ) {
    super(workflowRepo);
  }

  async execute(request: KpiRequest): Promise<KpiResponse> {
    return this.executeBase(request, 'Total Workflows');
  }
} 
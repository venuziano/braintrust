import { Injectable, Inject } from '@nestjs/common';
import { BaseKpiUseCase } from '../../../../shared/modules/kpi/application/use-cases/base-kpi.use-case';
import { KpiRequest, KpiResponse } from '../../../../shared/dto/kpi.dto';
import {
  EXECUTION_REPOSITORY_TOKEN,
  ExecutionRepository,
} from '../../domain/repositories/execution.repository.interface';

@Injectable()
export class GetTotalTimeSavedKpiUseCase extends BaseKpiUseCase {
  constructor(
    @Inject(EXECUTION_REPOSITORY_TOKEN)
    private readonly executionRepo: ExecutionRepository,
  ) {
    super(executionRepo);
  }

  async execute(request: KpiRequest): Promise<KpiResponse> {
    const baseResponse = await this.executeBase(request, 'Time Saved');
    
    // Convert seconds to hours and format the value
    const hours = baseResponse.value / 3600; // Convert seconds to hours
    const formattedValue = Math.round(hours * 10) / 10; // Round to 1 decimal place
    
    return {
      ...baseResponse,
      value: formattedValue,
    };
  }
} 
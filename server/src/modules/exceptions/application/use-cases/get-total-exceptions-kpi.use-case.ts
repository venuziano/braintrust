import { Injectable, Inject } from '@nestjs/common';
import { BaseKpiUseCase } from '../../../../shared/modules/kpi/application/use-cases/base-kpi.use-case';
import { KpiRequest, KpiResponse } from '../../../../shared/dto/kpi.dto';
import {
  EXCEPTION_REPOSITORY_TOKEN,
  ExceptionRepository,
} from '../../domain/repositories/exception.repository.interface';

@Injectable()
export class GetTotalExceptionsKpiUseCase extends BaseKpiUseCase {
  constructor(
    @Inject(EXCEPTION_REPOSITORY_TOKEN)
    private readonly exceptionRepo: ExceptionRepository,
  ) {
    super(exceptionRepo);
  }

  async execute(request: KpiRequest): Promise<KpiResponse> {
    return this.executeBase(request, 'Total Exceptions');
  }
} 
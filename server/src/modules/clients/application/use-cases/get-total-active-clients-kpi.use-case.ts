import { Injectable, Inject } from '@nestjs/common';
import { BaseKpiUseCase } from '../../../../shared/modules/kpi/application/use-cases/base-kpi.use-case';
import { KpiRequest, KpiResponse } from '../../../../shared/dto/kpi.dto';
import { CLIENT_REPOSITORY_TOKEN, ClientRepository } from '../../domain/repositories/client.repository.interface';

@Injectable()
export class GetTotalActiveClientsKpiUseCase extends BaseKpiUseCase {
  constructor(@Inject(CLIENT_REPOSITORY_TOKEN) private readonly clientRepo: ClientRepository) {
    super(clientRepo);
  }

  async execute(request: KpiRequest): Promise<KpiResponse> {
    return this.executeBase(request, 'Active Clients');
  }
} 
import { Injectable, Inject } from '@nestjs/common';
import { GetAllClientsRequest, GetAllClientsResponse } from '../dto/get-all-clients.dto';
import {
  CLIENT_REPOSITORY_TOKEN,
  ClientRepository,
} from '../../domain/repositories/client.repository.interface';

@Injectable()
export class GetAllClientsUseCase {
  constructor(
    @Inject(CLIENT_REPOSITORY_TOKEN)
    private readonly clientRepo: ClientRepository,
  ) {}

  async execute(request: GetAllClientsRequest): Promise<GetAllClientsResponse> {
    const result = await this.clientRepo.findAll(request);
    
    const items = result.items.map((m) => ({
      id: m.toProps().id,
      name: m.toProps().name,
      contractStart: m.toProps().contractStart?.toString() ?? 'Aug 02, 2025',
      workflowsCount: m.toProps().workflowsCount,
      nodesCount: m.toProps().nodesCount,
      executionsCount: m.toProps().executionsCount,
      exceptionsCount: m.toProps().exceptionsCount,
      revenue: m.toProps().revenue,
      timeSaved: m.getTimeSavedFormatted(),
      moneySaved: m.toProps().moneySaved,
    }));

    return {
      items,
      pagination: result.pagination,
    };
  }
}

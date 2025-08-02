import { Injectable, Inject } from '@nestjs/common';
import { GetAllClientsResponse } from '../dto/get-all-clients.dto';
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

  async execute(): Promise<GetAllClientsResponse> {
    const metrics = await this.clientRepo.findAll();
    return metrics.map((m) => ({
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
  }
}

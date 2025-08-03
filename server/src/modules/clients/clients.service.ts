import { Injectable } from '@nestjs/common';
import { GetAllClientsUseCase } from './application/use-cases/get-all-clients.use-case';
import { GetAllClientsRequest, GetAllClientsResponse } from './application/dto/get-all-clients.dto';

/**
 * Clients service that orchestrates use cases
 */
@Injectable()
export class ClientsService {
  constructor(
    private readonly getAllClientsUseCase: GetAllClientsUseCase,
  ) {}

  /**
   * Retrieves all clients with metrics
   */
  async getAllClients(request: GetAllClientsRequest): Promise<GetAllClientsResponse> {
    return this.getAllClientsUseCase.execute(request);
  }
} 
import { Client } from '../entities/client.entity';
import { ClientMetrics } from '../entities/client-metrics.entity';
import { PaginationRequest, PaginationResponse } from '../../../../shared/dto/pagination.dto';

export const CLIENT_REPOSITORY_TOKEN = 'ClientRepository';

export interface ClientRepository {
  /**
   * Retrieves all clients with aggregated metrics
   */
  findAll(request: PaginationRequest): Promise<PaginationResponse<ClientMetrics>>;
  findById(id: number): Promise<Client | null>;
}

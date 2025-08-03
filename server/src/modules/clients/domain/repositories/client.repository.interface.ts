import { Client } from '../entities/client.entity';
import { ClientMetrics } from '../entities/client-metrics.entity';
import { PaginationRequest, PaginationResponse } from '../../../../shared/dto/pagination.dto';
import { IKpiRepository } from '../../../../shared/modules/kpi/domain/repositories/kpi.repository.interface';

export const CLIENT_REPOSITORY_TOKEN = 'ClientRepository';

export interface ClientRepository extends IKpiRepository {
  /**
   * Retrieves all clients with aggregated metrics
   */
  findAll(request: PaginationRequest): Promise<PaginationResponse<ClientMetrics>>;
  findById(id: number): Promise<Client | null>;
}

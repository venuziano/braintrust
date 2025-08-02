import { Client } from '../entities/client.entity';
import { ClientMetrics } from '../entities/client-metrics.entity';

export const CLIENT_REPOSITORY_TOKEN = 'ClientRepository';

export interface ClientRepository {
  /**
   * Retrieves all clients with aggregated metrics
   */
  findAll(): Promise<ClientMetrics[]>;
  findById(id: number): Promise<Client | null>;
}

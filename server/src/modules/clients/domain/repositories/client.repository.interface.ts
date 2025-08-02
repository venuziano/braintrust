import { GetAllClientsResponse } from '../../application/dto/get-all-clients.dto';
import { Client } from '../entities/client.entity';

export const CLIENT_REPOSITORY_TOKEN = 'ClientRepository';

export interface ClientRepository {
  /**
   * Retrieves all clients with aggregated metrics
   */
  findAll(): Promise<GetAllClientsResponse>;
  findById(id: number): Promise<Client | null>;
}

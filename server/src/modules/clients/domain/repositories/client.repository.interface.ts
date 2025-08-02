import { Client } from "../entities/client.entity";

export const CLIENT_REPOSITORY_TOKEN = "ClientRepository";

export interface ClientRepository {
  findAll(): Promise<Client[]>;
  findById(id: number): Promise<Client | null>;
} 
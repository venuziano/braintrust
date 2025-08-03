import { Injectable } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { GetAllClientsRequestSchema, GetAllClientsResponseSchema } from './application/dto/get-all-clients.dto';
import { t } from '../../infrastructure/trpc/trpc.shared';

@Injectable()
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  createRouter() {
    return t.router({
      getAll: t.procedure
        .input(GetAllClientsRequestSchema)
        .output(GetAllClientsResponseSchema)
        .query(({ input }) => this.clientsService.getAllClients(input)),
    });
  }
}

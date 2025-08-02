import { Injectable } from '@nestjs/common';
import { initTRPC } from '@trpc/server';
import { ClientsService } from './clients.service';
import { GetAllClientsResponseSchema } from './application/dto/get-all-clients.dto';

const t = initTRPC.create();

@Injectable()
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  createRouter() {
    return t.router({
      getAll: t.procedure
        .output(GetAllClientsResponseSchema)
        .query(() => this.clientsService.getAllClients()),
    });
  }
}

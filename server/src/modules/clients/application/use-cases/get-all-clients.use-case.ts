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
    return this.clientRepo.findAll();
  }
}

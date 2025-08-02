import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientSchema } from './infrastructure/typeorm/client.schema';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { GetAllClientsUseCase } from './application/use-cases/get-all-clients.use-case';
import { TypeOrmClientRepository } from './infrastructure/repositories/typeorm-client.repository';
import { CLIENT_REPOSITORY_TOKEN } from './domain/repositories/client.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([ClientSchema])],
  providers: [
    ClientsController,
    ClientsService,
    GetAllClientsUseCase,
    { provide: CLIENT_REPOSITORY_TOKEN, useClass: TypeOrmClientRepository },
  ],
  exports: [ClientsController, ClientsService],
})
export class ClientsModule {} 
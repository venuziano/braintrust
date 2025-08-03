import { Injectable } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { GetAllClientsRequestSchema, GetAllClientsResponseSchema } from './application/dto/get-all-clients.dto';
import { KpiRequestSchema, KpiResponseSchema } from '../../shared/dto/kpi.dto';
import { GetTotalActiveClientsKpiUseCase } from './application/use-cases/get-total-active-clients-kpi.use-case';
import { t } from '../../infrastructure/trpc/trpc.shared';
import { JwtService } from '@nestjs/jwt';
import { createProtectedProcedure } from 'src/infrastructure/trpc/trpc.middleware';

@Injectable()
export class ClientsController {
  constructor(
    private readonly clientsService: ClientsService,
    private readonly getTotalActiveClientsKpiUseCase: GetTotalActiveClientsKpiUseCase,
    private readonly jwtService: JwtService,
  ) {}

  createRouter() {
    const protectedProcedure = createProtectedProcedure(this.jwtService);
    
    return t.router({
      getAll: protectedProcedure.admin(this.jwtService)
        .input(GetAllClientsRequestSchema)
        .output(GetAllClientsResponseSchema)
        .query(({ input }) => this.clientsService.getAllClients(input)),
      getTotalActiveClientsKpi: protectedProcedure.admin(this.jwtService)
        .input(KpiRequestSchema)
        .output(KpiResponseSchema)
        .query(({ input }) => this.getTotalActiveClientsKpiUseCase.execute(input)),
    });
  }
}

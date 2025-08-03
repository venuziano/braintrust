import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkflowSchema } from '../workflows/infrastructure/typeorm/workflow.schema';
import { GetClientDashboardUseCase } from './application/use-cases/get-client-dashboard.use-case';
import { ClientDashboardController } from './client-dashboard.controller';
import { TypeOrmClientDashboardRepository } from './infrastructure/repositories/typeorm-client-dashboard.repository';
import { CLIENT_DASHBOARD_REPOSITORY_TOKEN } from './domain/repositories/client-dashboard.repository.interface';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkflowSchema]),
  ],
  providers: [
    GetClientDashboardUseCase,
    ClientDashboardController,
    {
      provide: CLIENT_DASHBOARD_REPOSITORY_TOKEN,
      useClass: TypeOrmClientDashboardRepository,
    },
  ],
  exports: [ClientDashboardController],
})
export class ClientDashboardModule {} 
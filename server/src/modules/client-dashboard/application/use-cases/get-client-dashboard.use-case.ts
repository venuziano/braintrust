import { Injectable, Inject } from '@nestjs/common';
import { CLIENT_DASHBOARD_REPOSITORY_TOKEN, ClientDashboardRepository } from '../../domain/repositories/client-dashboard.repository.interface';
import { GetClientDashboardResponse } from '../dto/get-client-dashboard.dto';
import { ClientDashboardMetrics } from '../../domain/entities/client-dashboard-metrics.entity';

@Injectable()
export class GetClientDashboardUseCase {
  constructor(
    @Inject(CLIENT_DASHBOARD_REPOSITORY_TOKEN)
    private readonly clientDashboardRepo: ClientDashboardRepository,
  ) {}

  async execute(clientId: number): Promise<GetClientDashboardResponse> {
    try {
      const metrics = await this.clientDashboardRepo.getClientDashboardMetrics(clientId);
      const props = metrics.toProps();

      return {
        timeSaved: {
          last7Days: props.timeSavedLast7Days,
          allTime: props.timeSavedAllTime,
        },
        moneySaved: {
          last7Days: props.moneySavedLast7Days,
          allTime: props.moneySavedAllTime,
        },
        activeWorkflows: props.activeWorkflows,
      };
    } catch (error) {
      // Graceful error handling - return default values
      console.error('Error fetching client dashboard metrics:', error);
      return {
        timeSaved: {
          last7Days: 0,
          allTime: 0,
        },
        moneySaved: {
          last7Days: 0,
          allTime: 0,
        },
        activeWorkflows: 0,
      };
    }
  }
} 
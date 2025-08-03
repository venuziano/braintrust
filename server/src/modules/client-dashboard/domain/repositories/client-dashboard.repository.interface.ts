import { ClientDashboardMetrics } from '../entities/client-dashboard-metrics.entity';

export const CLIENT_DASHBOARD_REPOSITORY_TOKEN = 'CLIENT_DASHBOARD_REPOSITORY_TOKEN';

export interface ClientDashboardRepository {
  getClientDashboardMetrics(clientId: number): Promise<ClientDashboardMetrics>;
} 
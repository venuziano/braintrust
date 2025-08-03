import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkflowSchema } from '../../../workflows/infrastructure/typeorm/workflow.schema';
import { ClientDashboardRepository } from '../../domain/repositories/client-dashboard.repository.interface';
import { ClientDashboardMetrics } from '../../domain/entities/client-dashboard-metrics.entity';

interface DashboardMetricsResult {
  timeSavedLast7Days: string | null;
  timeSavedAllTime: string | null;
  moneySavedLast7Days: string | null;
  moneySavedAllTime: string | null;
  activeWorkflows: string;
}

@Injectable()
export class TypeOrmClientDashboardRepository implements ClientDashboardRepository {
  constructor(
    @InjectRepository(WorkflowSchema)
    private readonly workflowRepo: Repository<WorkflowSchema>,
  ) {}

  async getClientDashboardMetrics(clientId: number): Promise<ClientDashboardMetrics> {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const result = await this.workflowRepo
      .createQueryBuilder('wf')
      .select([
        'SUM(CASE WHEN wf.created_at >= :sevenDaysAgo THEN EXTRACT(EPOCH FROM wf.time_saved_per_exec) ELSE 0 END)', 'timeSavedLast7Days',
        'SUM(EXTRACT(EPOCH FROM wf.time_saved_per_exec))', 'timeSavedAllTime',
        'SUM(CASE WHEN wf.created_at >= :sevenDaysAgo THEN wf.cost_saved_per_exec ELSE 0 END)', 'moneySavedLast7Days',
        'SUM(wf.cost_saved_per_exec)', 'moneySavedAllTime',
        'COUNT(wf.id)', 'activeWorkflows'
      ])
      .where('wf.client_id = :clientId', { clientId })
      .andWhere('wf.time_saved_per_exec IS NOT NULL')
      .andWhere('wf.cost_saved_per_exec IS NOT NULL')
      .setParameter('sevenDaysAgo', sevenDaysAgo)
      .getRawOne<DashboardMetricsResult>();

    // Convert time from seconds to hours and handle nulls
    const timeSavedLast7Days = result?.timeSavedLast7Days ? parseFloat(result.timeSavedLast7Days) / 3600 : 0;
    const timeSavedAllTime = result?.timeSavedAllTime ? parseFloat(result.timeSavedAllTime) / 3600 : 0;
    const moneySavedLast7Days = result?.moneySavedLast7Days ? parseFloat(result.moneySavedLast7Days) : 0;
    const moneySavedAllTime = result?.moneySavedAllTime ? parseFloat(result.moneySavedAllTime) : 0;
    const activeWorkflows = result?.activeWorkflows ? parseInt(result.activeWorkflows) : 0;

    return ClientDashboardMetrics.fromProps({
      timeSavedLast7Days,
      timeSavedAllTime,
      moneySavedLast7Days,
      moneySavedAllTime,
      activeWorkflows,
    });
  }
} 
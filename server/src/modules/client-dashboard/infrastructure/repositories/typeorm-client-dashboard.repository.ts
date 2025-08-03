import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkflowSchema } from '../../../workflows/infrastructure/typeorm/workflow.schema';
import { ClientDashboardRepository } from '../../domain/repositories/client-dashboard.repository.interface';
import { ClientDashboardMetrics } from '../../domain/entities/client-dashboard-metrics.entity';

interface DashboardMetricsResult {
  timesavedlast7days: string | null;
  timesavedalltime: string | null;
  moneysavedlast7days: string | null;
  moneysavedalltime: string | null;
  activeworkflows: string;
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
        'SUM(CASE WHEN wf.created_at >= :sevenDaysAgo THEN EXTRACT(EPOCH FROM wf.time_saved_per_exec) ELSE 0 END) as timesavedlast7days',
        'SUM(EXTRACT(EPOCH FROM wf.time_saved_per_exec)) as timesavedalltime',
        'SUM(CASE WHEN wf.created_at >= :sevenDaysAgo THEN wf.cost_saved_per_exec ELSE 0 END) as moneysavedlast7days',
        'SUM(wf.cost_saved_per_exec) as moneysavedalltime',
        'COUNT(wf.id) as activeworkflows'
      ])
      .where('wf.client_id = :clientId', { clientId })
      .andWhere('wf.time_saved_per_exec IS NOT NULL')
      .andWhere('wf.cost_saved_per_exec IS NOT NULL')
      .setParameter('sevenDaysAgo', sevenDaysAgo)
      .getRawOne<DashboardMetricsResult>();

    // Convert time from seconds to hours and handle nulls
    const timeSavedLast7Days = result?.timesavedlast7days ? parseFloat(result.timesavedlast7days) / 3600 : 0;
    const timeSavedAllTime = result?.timesavedalltime ? parseFloat(result.timesavedalltime) / 3600 : 0;
    const moneySavedLast7Days = result?.moneysavedlast7days ? parseFloat(result.moneysavedlast7days) : 0;
    const moneySavedAllTime = result?.moneysavedalltime ? parseFloat(result.moneysavedalltime) : 0;
    const activeWorkflows = result?.activeworkflows ? parseInt(result.activeworkflows) : 0;

    return ClientDashboardMetrics.fromProps({
      timeSavedLast7Days,
      timeSavedAllTime,
      moneySavedLast7Days,
      moneySavedAllTime,
      activeWorkflows,
    });
  }
} 
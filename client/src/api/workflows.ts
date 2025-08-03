import type { TimePeriod } from '../../../server/src/shared/dto/kpi.dto';
import { trpc } from '../utils/trpc';

/**
 * Fetches the total workflows KPI for the given time period.
 * Defaults to “itd” if no period is provided.
 */
export function useTotalWorkflows(
  timePeriod: TimePeriod = 'itd',
) {
  return trpc.workflows.getTotalWorkflowsKpi.useQuery(
    { timePeriod },
  );
}

/**
 * Fetches the total revenue KPI for the given time period.
 * Defaults to "itd" if no period is provided.
 */
export function useTotalRevenue(
  timePeriod: TimePeriod = 'itd',
) {
  return trpc.workflows.getTotalRevenueKpi.useQuery(
    { timePeriod },
  );
}
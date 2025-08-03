import type { TimePeriod } from '../../../server/src/shared/dto/kpi.dto';
import { trpc } from '../utils/trpc';

/**
 * Fetches the total time saved KPI for the given time period.
 * Defaults to "itd" if no period is provided.
 */
export function useTotalTimeSaved(
  timePeriod: TimePeriod = 'itd',
) {
  return trpc.executions.getTotalTimeSavedKpi.useQuery(
    { timePeriod },
  );
} 
import type { TimePeriod } from '../../../server/src/shared/dto/kpi.dto';
import { trpc } from '../utils/trpc';

/**
 * Fetches the total exceptions KPI for the given time period.
 * Defaults to "itd" if no period is provided.
 */
export function useTotalExceptions(
  timePeriod: TimePeriod = 'itd',
) {
  return trpc.exceptions.getTotalExceptionsKpi.useQuery(
    { timePeriod },
  );
} 
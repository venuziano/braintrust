import type { TimePeriod } from '../../../server/src/shared/dto/kpi.dto';
import { trpc } from '../utils/trpc';

/**
 * Fetches all clients with pagination
 */
export function useClients(page: number, limit: number) {
  return trpc.clients.getAll.useQuery({ page, limit });
}

/**
 * Fetches the total active clients KPI for the given time period.
 * Defaults to "itd" if no period is provided.
 */
export function useTotalActiveClients(
  timePeriod: TimePeriod = 'itd',
) {
  return trpc.clients.getTotalActiveClientsKpi.useQuery(
    { timePeriod },
  );
}
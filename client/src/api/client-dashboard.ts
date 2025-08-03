import { trpc } from '../utils/trpc';

export function useClientDashboard() {
  return trpc.clientDashboard.getClientDashboard.useQuery();
} 
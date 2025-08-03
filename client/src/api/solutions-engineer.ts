import { trpc } from '../utils/trpc';

export function useSolutionsEngineerProfile() {
  return trpc.solutionsEngineer.getSolutionsEngineerProfile.useQuery();
} 
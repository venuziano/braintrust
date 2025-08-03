import { trpc } from '../utils/trpc';

export function useClientPipelineProgress() {
  return trpc.pipeline.getClientPipelineProgress.useQuery({});
} 
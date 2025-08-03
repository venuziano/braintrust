import { z } from 'zod';

export const GetClientPipelineProgressRequestSchema = z.object({
  // No clientId needed - will be extracted from JWT token via middleware
});

export const PipelineProgressItemSchema = z.object({
  phaseName: z.string(),
  status: z.enum(['not_started', 'in_progress', 'completed']),
  completedAt: z.date().nullable(),
  order: z.number(),
});

export const GetClientPipelineProgressResponseSchema = z.object({
  clientId: z.number(),
  pipelineProgress: z.array(PipelineProgressItemSchema),
});

export type GetClientPipelineProgressRequest = z.infer<typeof GetClientPipelineProgressRequestSchema>;
export type GetClientPipelineProgressResponse = z.infer<typeof GetClientPipelineProgressResponseSchema>;
export type PipelineProgressItem = z.infer<typeof PipelineProgressItemSchema>; 
import { z } from 'zod';

export const GetClientDashboardResponseSchema = z.object({
  timeSaved: z.object({
    last7Days: z.number(),
    allTime: z.number(),
  }),
  moneySaved: z.object({
    last7Days: z.number(),
    allTime: z.number(),
  }),
  activeWorkflows: z.number(),
});

export type GetClientDashboardResponse = z.infer<typeof GetClientDashboardResponseSchema>; 
import { z } from 'zod';

/**
 * Time period filter options
 */
export const TimePeriodSchema = z.enum([
  'last_7_days',
  'last_30_days', 
  'mtd',
  'qtd',
  'ytd',
  'itd'
]);

/**
 * Zod schema for Total Workflows KPI response
 */
export const TotalWorkflowsKpiSchema = z.object({
  label: z.string(),
  value: z.number(),
  changePercentage: z.number(),
  changeDirection: z.enum(['up', 'down']),
  timePeriod: TimePeriodSchema,
});

/**
 * Zod schema for getTotalWorkflowsKpi request
 */
export const GetTotalWorkflowsKpiRequestSchema = z.object({
  timePeriod: TimePeriodSchema.default('itd'),
});

/**
 * Zod schema for getTotalWorkflowsKpi response
 */
export const GetTotalWorkflowsKpiResponseSchema = TotalWorkflowsKpiSchema;

export type TimePeriod = z.infer<typeof TimePeriodSchema>;
export type TotalWorkflowsKpi = z.infer<typeof TotalWorkflowsKpiSchema>;
export type GetTotalWorkflowsKpiRequest = z.infer<typeof GetTotalWorkflowsKpiRequestSchema>;
export type GetTotalWorkflowsKpiResponse = z.infer<typeof GetTotalWorkflowsKpiResponseSchema>; 
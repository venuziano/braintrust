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
 * Zod schema for KPI response
 */
export const KpiSchema = z.object({
  label: z.string(),
  value: z.number(),
  changePercentage: z.number(),
  changeDirection: z.enum(['up', 'down']),
  timePeriod: TimePeriodSchema,
});

/**
 * Zod schema for KPI request
 */
export const KpiRequestSchema = z.object({
  timePeriod: TimePeriodSchema.default('itd'),
});

/**
 * Zod schema for KPI response
 */
export const KpiResponseSchema = KpiSchema;

export type TimePeriod = z.infer<typeof TimePeriodSchema>;
export type Kpi = z.infer<typeof KpiSchema>;
export type KpiRequest = z.infer<typeof KpiRequestSchema>;
export type KpiResponse = z.infer<typeof KpiResponseSchema>; 
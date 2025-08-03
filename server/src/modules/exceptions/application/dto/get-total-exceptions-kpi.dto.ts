import { z } from 'zod';
import { TimePeriodSchema, type TimePeriod } from '../../../../shared/dto/time-period.dto';

/**
 * Zod schema for Total Exceptions KPI response
 */
export const TotalExceptionsKpiSchema = z.object({
  label: z.string(),
  value: z.number(),
  changePercentage: z.number(),
  changeDirection: z.enum(['up', 'down']),
  timePeriod: TimePeriodSchema,
});

/**
 * Zod schema for getTotalExceptionsKpi request
 */
export const GetTotalExceptionsKpiRequestSchema = z.object({
  timePeriod: TimePeriodSchema.default('itd'),
});

/**
 * Zod schema for getTotalExceptionsKpi response
 */
export const GetTotalExceptionsKpiResponseSchema = TotalExceptionsKpiSchema;

export type TotalExceptionsKpi = z.infer<typeof TotalExceptionsKpiSchema>;
export type GetTotalExceptionsKpiRequest = z.infer<typeof GetTotalExceptionsKpiRequestSchema>;
export type GetTotalExceptionsKpiResponse = z.infer<typeof GetTotalExceptionsKpiResponseSchema>; 
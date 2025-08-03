import { z } from 'zod';
import { PaginationRequestSchema, PaginationResponseSchema } from '../../../../shared/dto/pagination.dto';

/**
 * Zod schema for Client metrics
 */
export const ClientMetricsSchema = z.object({
  id: z.number(),
  name: z.string(),
  contractStart: z.string().nullable(),
  workflowsCount: z.number(),
  nodesCount: z.number(),
  executionsCount: z.number(),
  exceptionsCount: z.number(),
  revenue: z.number(),
  timeSaved: z.string(),
  moneySaved: z.number(),
});

/**
 * Zod schema for getAllClients request
 */
export const GetAllClientsRequestSchema = PaginationRequestSchema;

/**
 * Zod schema for getAllClients response
 */
export const GetAllClientsResponseSchema = PaginationResponseSchema.extend({
  items: z.array(ClientMetricsSchema),
});

export type ClientMetrics = z.infer<typeof ClientMetricsSchema>;
export type GetAllClientsRequest = z.infer<typeof GetAllClientsRequestSchema>;
export type GetAllClientsResponse = z.infer<typeof GetAllClientsResponseSchema>;

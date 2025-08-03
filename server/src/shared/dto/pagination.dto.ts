import { z } from 'zod';

/**
 * Pagination request schema
 */
export const PaginationRequestSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
});

/**
 * Pagination response schema
 */
export const PaginationResponseSchema = z.object({
  items: z.array(z.any()),
  pagination: z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    totalPages: z.number(),
    hasNext: z.boolean(),
    hasPrev: z.boolean(),
  }),
});

/**
 * Pagination request type
 */
export type PaginationRequest = z.infer<typeof PaginationRequestSchema>;

/**
 * Pagination response type
 */
export type PaginationResponse<T> = {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
};

/**
 * Helper function to calculate pagination metadata
 */
export function calculatePagination(page: number, limit: number, total: number) {
  const totalPages = Math.ceil(total / limit);
  const hasNext = page < totalPages;
  const hasPrev = page > 1;

  return {
    page,
    limit,
    total,
    totalPages,
    hasNext,
    hasPrev,
  };
} 
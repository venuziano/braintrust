import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import type { Request as ExpressRequest, Response as ExpressResponse } from 'express';

/**
 * Shared context type for all tRPC instances
 */
export type Context = {
  req: ExpressRequest;
  res: ExpressResponse;
};

/**
 * Shared tRPC instance with proper context and transformer
 */
export const t = initTRPC.context<Context>().create({ 
  transformer: superjson 
}); 
import { All, Controller, Req, Res, Next } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TrpcRouter } from './infrastructure/trpc/trpc.router';
import { createExpressMiddleware } from '@trpc/server/adapters/express';

@Controller()
export class AppController {
  constructor(private readonly trpcRouter: TrpcRouter) {}

  @All('/trpc/*path')
  trpc(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    const router = this.trpcRouter.createRouter();

    const handler = createExpressMiddleware({
      router,
      createContext: () => ({}),
      onError: ({ error, path }) => {
        console.error(`❌ tRPC failed on ${path}: ${error}`);
      },
    });

    return handler(req, res, next);
  }
}

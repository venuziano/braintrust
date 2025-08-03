import { Injectable } from '@nestjs/common';
import { GetClientPipelineProgressUseCase } from './application/use-cases/get-client-pipeline-progress.use-case';
import { 
  GetClientPipelineProgressRequestSchema, 
  GetClientPipelineProgressResponseSchema 
} from './application/dto/get-client-pipeline-progress.dto';
import { t } from '../../infrastructure/trpc/trpc.shared';
import { JwtService } from '@nestjs/jwt';
import { createProtectedProcedure } from '../../infrastructure/trpc/trpc.middleware';

@Injectable()
export class PipelineController {
  constructor(
    private readonly getClientPipelineProgressUseCase: GetClientPipelineProgressUseCase,
    private readonly jwtService: JwtService,
  ) {}

  createRouter() {
    const protectedProcedure = createProtectedProcedure(this.jwtService);
    
    return t.router({
      getClientPipelineProgress: protectedProcedure.client(this.jwtService)
        .input(GetClientPipelineProgressRequestSchema)
        .output(GetClientPipelineProgressResponseSchema)
        .query(({ ctx }) => {
          // ctx.user.clientId is now available from middleware
          if (!ctx.user?.clientId) {
            throw new Error('Client ID not found in token');
          }
          return this.getClientPipelineProgressUseCase.execute(ctx.user.clientId);
        }),
    });
  }
} 
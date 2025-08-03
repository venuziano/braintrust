import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WorkflowSchema } from './infrastructure/typeorm/workflow.schema';
import { TypeOrmWorkflowRepository } from './infrastructure/repositories/typeorm-workflow.repository';
import { WorkflowsController } from './workflows.controller';
import { GetTotalWorkflowsKpiUseCase } from './application/use-cases/get-total-workflows-kpi.use-case';
import { WORKFLOW_REPOSITORY_TOKEN } from './domain/repositories/workflow.repository.interface';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkflowSchema]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        // NOTE: It should be a secret key, but for now we're using a fixed key for testing
        secret: '4b5a6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5',
        signOptions: { expiresIn: '4h' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: WORKFLOW_REPOSITORY_TOKEN,
      useClass: TypeOrmWorkflowRepository,
    },
    GetTotalWorkflowsKpiUseCase,
    WorkflowsController,
  ],
  exports: [WORKFLOW_REPOSITORY_TOKEN, WorkflowsController],
})
export class WorkflowsModule {} 
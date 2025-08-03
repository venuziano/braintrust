import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExceptionSchema } from './infrastructure/typeorm/exception.schema';
import { TypeOrmExceptionRepository } from './infrastructure/repositories/typeorm-exception.repository';
import { EXCEPTION_REPOSITORY_TOKEN } from './domain/repositories/exception.repository.interface';
import { GetTotalExceptionsKpiUseCase } from './application/use-cases/get-total-exceptions-kpi.use-case';
import { ExceptionsController } from './exceptions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ExceptionSchema])],
  providers: [
    { provide: EXCEPTION_REPOSITORY_TOKEN, useClass: TypeOrmExceptionRepository },
    GetTotalExceptionsKpiUseCase,
    ExceptionsController,
  ],
  exports: [EXCEPTION_REPOSITORY_TOKEN, ExceptionsController],
})
export class ExceptionsModule {} 
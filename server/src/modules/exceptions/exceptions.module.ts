import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExceptionSchema } from './infrastructure/typeorm/exception.schema';
import { TypeOrmExceptionRepository } from './infrastructure/repositories/typeorm-exception.repository';
import { EXCEPTION_REPOSITORY_TOKEN } from './domain/repositories/exception.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([ExceptionSchema])],
  providers: [
    { provide: EXCEPTION_REPOSITORY_TOKEN, useClass: TypeOrmExceptionRepository },
  ],
  exports: [TypeOrmModule],
})
export class ExceptionsModule {} 
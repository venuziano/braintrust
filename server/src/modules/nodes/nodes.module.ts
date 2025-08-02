import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NodeSchema } from './infrastructure/typeorm/node.schema';
import { TypeOrmNodeRepository } from './infrastructure/repositories/typeorm-node.repository';
import { NODE_REPOSITORY_TOKEN } from './domain/repositories/node.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([NodeSchema])],
  providers: [
    { provide: NODE_REPOSITORY_TOKEN, useClass: TypeOrmNodeRepository },
  ],
  exports: [TypeOrmModule],
})
export class NodesModule {} 
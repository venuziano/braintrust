import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientSchema } from '../typeorm/client.schema';
import { ClientRepository } from '../../domain/repositories/client.repository.interface';
import { Client, ClientProps } from '../../domain/entities/client.entity';
import {
  ClientMetrics,
} from '../../domain/entities/client-metrics.entity';

@Injectable()
export class TypeOrmClientRepository implements ClientRepository {
  constructor(
    @InjectRepository(ClientSchema)
    private readonly repo: Repository<ClientSchema>,
  ) {}

  async findAll(): Promise<ClientMetrics[]> {
    const raw = await this.repo
      .createQueryBuilder('client')
      .select('client.id', 'id')
      .addSelect('client.name', 'name')
      .addSelect('NULL', 'contractStart')
      .addSelect('COUNT(DISTINCT wf.id)', 'workflowsCount')
      .addSelect('COUNT(DISTINCT node.id)', 'nodesCount')
      .addSelect('COUNT(DISTINCT exec.id)', 'executionsCount')
      .addSelect('COUNT(DISTINCT exception.id)', 'exceptionsCount')
      .addSelect('SUM(wf.cost_saved_per_exec)', 'revenue')
      .addSelect(
        'SUM(EXTRACT(EPOCH FROM wf.time_saved_per_exec))',
        'timeSavedInSeconds',
      )
      .addSelect('SUM(exec.cost_saved)', 'moneySaved')
      .leftJoin('workflows', 'wf', 'wf.client_id = client.id')
      .leftJoin('nodes', 'node', 'node.workflow_id = wf.id')
      .leftJoin('executions', 'exec', 'exec.workflow_id = wf.id')
      .leftJoin('exceptions', 'exception', 'exception.execution_id = exec.id')
      .groupBy('client.id')
      .getRawMany<{
        id: string;
        name: string;
        workflowsCount: string;
        nodesCount: string;
        executionsCount: string;
        exceptionsCount: string;
        revenue: string;
        timeSavedInSeconds: string;
        moneySaved: string;
      }>();

    return raw.map((r) => {
      return ClientMetrics.fromProps({
        id: Number(r.id),
        name: r.name,
        contractStart: null,
        workflowsCount: Number(r.workflowsCount) || 0,
        nodesCount: Number(r.nodesCount) || 0,
        executionsCount: Number(r.executionsCount) || 0,
        exceptionsCount: Number(r.exceptionsCount) || 0,
        revenue: parseFloat(r.revenue) || 0,
        timeSavedInSeconds: parseFloat(r.timeSavedInSeconds) || 0,
        moneySaved: parseFloat(r.moneySaved) || 0,
      });
    });
  }

  async findById(id: number): Promise<Client | null> {
    const s = await this.repo.findOne({ where: { id } });
    return s ? new Client({ id: s.id, name: s.name, url: s.url }) : null;
  }

  /**
   * Converts TypeORM schema to domain entity
   */
  // private toClientMetricsDomainEntity(schema: ClientSchema): Client {
  //   return ClientMetrics.fromProps({
  //     id: schema.cl,
  //     name: schema.name,
  //     url: schema.url,
  //   });
  // }
}

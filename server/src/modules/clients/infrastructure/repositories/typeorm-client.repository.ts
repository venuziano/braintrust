import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientSchema } from '../typeorm/client.schema';
import {
  ClientMetrics,
  GetAllClientsResponse,
} from '../../application/dto/get-all-clients.dto';
import { ClientRepository } from '../../domain/repositories/client.repository.interface';
import { Client } from '../../domain/entities/client.entity';
import { formatDuration } from 'src/shared/entities/helpers';
// import { ClientMetrics } from '../../domain/entities/clientMetrics';

@Injectable()
export class TypeOrmClientRepository implements ClientRepository {
  constructor(
    @InjectRepository(ClientSchema)
    private readonly repo: Repository<ClientSchema>,
  ) {}

  async findAll(): Promise<GetAllClientsResponse> {
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
      .getRawMany();

    // return raw.map((r) => this.toClientMetricsDomainEntity(r));
    return raw.map(
      (r): ClientMetrics => ({
        id: Number(r.id),
        name: r.name,
        contractStart: null,
        workflowsCount: Number(r.workflowsCount) || 0,
        nodesCount: Number(r.nodesCount) || 0,
        executionsCount: Number(r.executionsCount) || 0,
        exceptionsCount: Number(r.exceptionsCount) || 0,
        revenue: parseFloat(r.revenue) || 0,
        timeSaved: formatDuration(r.timeSavedInSeconds),
        moneySaved: parseFloat(r.moneySaved) || 0,
      }),
    );
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

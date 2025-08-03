import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientSchema } from '../typeorm/client.schema';
import { ClientRepository } from '../../domain/repositories/client.repository.interface';
import { Client, ClientProps } from '../../domain/entities/client.entity';
import {
  ClientMetrics,
} from '../../domain/entities/client-metrics.entity';
import { PaginationRequest, PaginationResponse, calculatePagination } from '../../../../shared/dto/pagination.dto';

@Injectable()
export class TypeOrmClientRepository implements ClientRepository {
  constructor(
    @InjectRepository(ClientSchema)
    private readonly repo: Repository<ClientSchema>,
  ) {}

  async findAll(request: PaginationRequest): Promise<PaginationResponse<ClientMetrics>> {
    // First, get the total count of clients
    const totalCount = await this.repo
      .createQueryBuilder('client')
      .getCount();

    // Get paginated client IDs first
    const clientIds = await this.repo
      .createQueryBuilder('client')
      .select('client.id', 'id')
      .skip((request.page - 1) * request.limit)
      .take(request.limit)
      .getRawMany<{ id: string }>();

    if (clientIds.length === 0) {
      return {
        items: [],
        pagination: calculatePagination(request.page, request.limit, totalCount),
      };
    }

    // Then get the detailed metrics for these specific clients
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
      .where('client.id IN (:...clientIds)', { clientIds: clientIds.map(c => c.id) })
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

    const items = raw.map((r) => {
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

    const result = {
      items,
      pagination: calculatePagination(request.page, request.limit, totalCount),
    };
    
    return result;
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

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EXECUTION_REPOSITORY_TOKEN, ExecutionRepository } from "../../domain/repositories/execution.repository.interface";
import { Execution } from "../../domain/entities/execution.entity";
import { ExecutionSchema } from "../typeorm/execution.schema";
import { TimePeriod } from "../../../../shared/dto/kpi.dto";
import { DateCalculator } from "../../../../shared/modules/kpi/infrastructure/utils/date-calculator.util";

@Injectable()
export class TypeOrmExecutionRepository implements ExecutionRepository {
  constructor(
    @InjectRepository(ExecutionSchema)
    private readonly repo: Repository<ExecutionSchema>,
  ) {}

  async findAll(): Promise<Execution[]> {
    const schemas = await this.repo.find({ relations: ['workflow'] });
    return schemas.map(
      s => new Execution({
        id: s.id,
        workflowId: s.workflow.id,
        succeeded: s.succeeded,
        timeTaken: s.time_taken,
        costSaved: s.cost_saved,
      }),
    );
  }

  async findById(id: number): Promise<Execution | null> {
    const s = await this.repo.findOne({ where: { id }, relations: ['workflow'] });
    return s
      ? new Execution({
          id: s.id,
          workflowId: s.workflow.id,
          succeeded: s.succeeded,
          timeTaken: s.time_taken,
          costSaved: s.cost_saved,
        })
      : null;
  }

  async getKpi(timePeriod: TimePeriod): Promise<{
    currentCount: number;
    previousCount: number;
  }> {
    const { currentStartDate, currentEndDate, previousStartDate, previousEndDate } = 
      DateCalculator.calculateDateRanges(timePeriod);

    // Get current period time saved in seconds
    const currentResult = await this.repo
      .createQueryBuilder('e')
      .leftJoin('e.workflow', 'wf')
      .select('SUM(EXTRACT(EPOCH FROM wf.time_saved_per_exec))', 'totalTimeSavedSeconds')
      .addSelect('COUNT(e.id)', 'executionCount')
      .where('e.created_at BETWEEN :startDate AND :endDate', {
        startDate: currentStartDate,
        endDate: currentEndDate,
      })
      .getRawOne<{ totalTimeSavedSeconds: string; executionCount: string }>();

    // Get previous period time saved in seconds
    const previousResult = await this.repo
      .createQueryBuilder('e')
      .leftJoin('e.workflow', 'wf')
      .select('SUM(EXTRACT(EPOCH FROM wf.time_saved_per_exec))', 'totalTimeSavedSeconds')
      .addSelect('COUNT(e.id)', 'executionCount')
      .where('e.created_at BETWEEN :startDate AND :endDate', {
        startDate: previousStartDate,
        endDate: previousEndDate,
      })
      .getRawOne<{ totalTimeSavedSeconds: string; executionCount: string }>();

    const currentCount = parseFloat(currentResult?.totalTimeSavedSeconds || '0');
    const previousCount = parseFloat(previousResult?.totalTimeSavedSeconds || '0');

    return { currentCount, previousCount };
  }
} 
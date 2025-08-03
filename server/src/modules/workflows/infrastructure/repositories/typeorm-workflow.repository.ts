import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Between } from "typeorm";
import { WORKFLOW_REPOSITORY_TOKEN, WorkflowRepository } from "../../domain/repositories/workflow.repository.interface";
import { Workflow } from "../../domain/entities/workflow.entity";
import { WorkflowSchema } from "../typeorm/workflow.schema";
import { TimePeriod } from "../../../../shared/dto/kpi.dto";
import { DateCalculator } from "../../../../shared/modules/kpi/infrastructure/utils/date-calculator.util";

@Injectable()
export class TypeOrmWorkflowRepository implements WorkflowRepository {
  constructor(
    @InjectRepository(WorkflowSchema)
    private readonly repo: Repository<WorkflowSchema>,
  ) {}

  async findAll(): Promise<Workflow[]> {
    const schemas = await this.repo.find({ relations: ['client', 'department'] });
    return schemas.map(
      s => new Workflow({
        id: s.id,
        clientId: s.client.id,
        departmentId: s.department.id,
        name: s.name,
        description: s.description,
        timeSavedPerExec: s.time_saved_per_exec,
        costSavedPerExec: s.cost_saved_per_exec,
      }),
    );
  }

  async findById(id: number): Promise<Workflow | null> {
    const s = await this.repo.findOne({ where: { id }, relations: ['client', 'department'] });
    return s ? new Workflow({
      id: s.id,
      clientId: s.client.id,
      departmentId: s.department.id,
      name: s.name,
      description: s.description,
      timeSavedPerExec: s.time_saved_per_exec,
      costSavedPerExec: s.cost_saved_per_exec,
    }) : null;
  }

  async getKpi(timePeriod: TimePeriod): Promise<{
    currentCount: number;
    previousCount: number;
  }> {
    const { currentStartDate, currentEndDate, previousStartDate, previousEndDate } = 
      DateCalculator.calculateDateRanges(timePeriod);

    const currentCount = await this.repo.count({
      where: {
        created_at: Between(currentStartDate, currentEndDate),
      },
    });

    const previousCount = await this.repo.count({
      where: {
        created_at: Between(previousStartDate, previousEndDate),
      },
    });

    return { currentCount, previousCount };
  }
} 
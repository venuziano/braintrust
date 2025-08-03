import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Between } from "typeorm";
import { WORKFLOW_REPOSITORY_TOKEN, WorkflowRepository } from "../../domain/repositories/workflow.repository.interface";
import { Workflow } from "../../domain/entities/workflow.entity";
import { WorkflowSchema } from "../typeorm/workflow.schema";
import { TimePeriod } from "../../application/dto/get-total-workflows-kpi.dto";

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

  async getTotalWorkflowsKpi(timePeriod: TimePeriod): Promise<{
    currentCount: number;
    previousCount: number;
  }> {
    const now = new Date();
    let currentStartDate: Date;
    let previousStartDate: Date;

    switch (timePeriod) {
      case 'last_7_days':
        // Last 7 days: from 7 days ago to now
        currentStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
        // Previous 7 days: from 14 days ago to 7 days ago
        previousStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 14);
        break;
      case 'last_30_days':
        // Last 30 days: from 30 days ago to now
        currentStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30);
        // Previous 30 days: from 60 days ago to 30 days ago
        previousStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 60);
        break;
      case 'mtd':
        // Month to date: from start of current month to now
        currentStartDate = new Date(now.getFullYear(), now.getMonth(), 1);
        // Previous month: from start of previous month to end of previous month
        previousStartDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        break;
      case 'qtd':
        // Quarter to date: from start of current quarter to now
        const currentQuarter = Math.floor(now.getMonth() / 3);
        currentStartDate = new Date(now.getFullYear(), currentQuarter * 3, 1);
        // Previous quarter: from start of previous quarter to end of previous quarter
        const previousQuarter = currentQuarter === 0 ? 3 : currentQuarter - 1;
        const previousQuarterYear = currentQuarter === 0 ? now.getFullYear() - 1 : now.getFullYear();
        previousStartDate = new Date(previousQuarterYear, previousQuarter * 3, 1);
        break;
      case 'ytd':
        // Year to date: from start of current year to now
        currentStartDate = new Date(now.getFullYear(), 0, 1);
        // Previous year: from start of previous year to end of previous year
        previousStartDate = new Date(now.getFullYear() - 1, 0, 1);
        break;
      case 'itd':
      default:
        // Inception to date: from beginning of time to now
        currentStartDate = new Date(0); // Beginning of time
        // Previous year: from start of previous year to end of previous year
        previousStartDate = new Date(now.getFullYear() - 1, 0, 1);
        break;
    }

    // Set time to start of day for consistent comparison
    currentStartDate.setHours(0, 0, 0, 0);
    previousStartDate.setHours(0, 0, 0, 0);
    const endDate = new Date(now);
    endDate.setHours(23, 59, 59, 999);

    const currentCount = await this.repo.count({
      where: {
        created_at: Between(currentStartDate, endDate),
      },
    });

    const previousCount = await this.repo.count({
      where: {
        created_at: Between(previousStartDate, currentStartDate),
      },
    });

    return { currentCount, previousCount };
  }
} 
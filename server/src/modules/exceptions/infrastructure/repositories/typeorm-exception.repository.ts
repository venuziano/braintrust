import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Between } from "typeorm";
import { EXCEPTION_REPOSITORY_TOKEN, ExceptionRepository } from "../../domain/repositories/exception.repository.interface";
import { Exception } from "../../domain/entities/exception.entity";
import { ExceptionSchema } from "../typeorm/exception.schema";
import { TimePeriod } from "../../../../shared/dto/kpi.dto";
import { DateCalculator } from "../../../../shared/modules/kpi/infrastructure/utils/date-calculator.util";

@Injectable()
export class TypeOrmExceptionRepository implements ExceptionRepository {
  constructor(
    @InjectRepository(ExceptionSchema)
    private readonly repo: Repository<ExceptionSchema>,
  ) {}

  async findAll(): Promise<Exception[]> {
    const schemas = await this.repo.find({ relations: ['execution'] });
    return schemas.map(
      s => new Exception({
        id: s.id,
        executionId: s.execution.id,
        exceptionType: s.exceptionType,
        severity: s.severity,
        remedy: s.remedy,
      }),
    );
  }

  async findById(id: number): Promise<Exception | null> {
    const s = await this.repo.findOne({ where: { id }, relations: ['execution'] });
    return s
      ? new Exception({
          id: s.id,
          executionId: s.execution.id,
          exceptionType: s.exceptionType,
          severity: s.severity,
          remedy: s.remedy,
        })
      : null;
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
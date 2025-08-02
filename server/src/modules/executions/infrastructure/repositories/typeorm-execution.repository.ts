import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EXECUTION_REPOSITORY_TOKEN, ExecutionRepository } from "../../domain/repositories/execution.repository.interface";
import { Execution } from "../../domain/entities/execution.entity";
import { ExecutionSchema } from "../typeorm/execution.schema";

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
} 
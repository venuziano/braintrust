import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DEPARTMENT_REPOSITORY_TOKEN, DepartmentRepository } from "../../domain/repositories/department.repository.interface";
import { Department } from "../../domain/entities/department.entity";
import { DepartmentSchema } from "../typeorm/department.schema";

@Injectable()
export class TypeOrmDepartmentRepository implements DepartmentRepository {
  constructor(
    @InjectRepository(DepartmentSchema)
    private readonly repo: Repository<DepartmentSchema>,
  ) {}

  async findAll(): Promise<Department[]> {
    const schemas = await this.repo.find({ relations: ['client'] });
    return schemas.map(
      s => new Department({ id: s.id, clientId: s.client.id, name: s.name }),
    );
  }

  async findById(id: number): Promise<Department | null> {
    const s = await this.repo.findOne({ where: { id }, relations: ['client'] });
    return s ? new Department({ id: s.id, clientId: s.client.id, name: s.name }) : null;
  }
} 
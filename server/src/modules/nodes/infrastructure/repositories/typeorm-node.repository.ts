import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { NODE_REPOSITORY_TOKEN, NodeRepository } from "../../domain/repositories/node.repository.interface";
import { Node } from "../../domain/entities/node.entity";
import { NodeSchema } from "../typeorm/node.schema";

@Injectable()
export class TypeOrmNodeRepository implements NodeRepository {
  constructor(
    @InjectRepository(NodeSchema)
    private readonly repo: Repository<NodeSchema>,
  ) {}

  async findAll(): Promise<Node[]> {
    const schemas = await this.repo.find({ relations: ['workflow'] });
    return schemas.map(
      s => new Node({ id: s.id, workflowId: s.workflow.id, name: s.name, nodeType: s.nodeType, settings: s.settings }),
    );
  }

  async findById(id: number): Promise<Node | null> {
    const s = await this.repo.findOne({ where: { id }, relations: ['workflow'] });
    return s ? new Node({ id: s.id, workflowId: s.workflow.id, name: s.name, nodeType: s.nodeType, settings: s.settings }) : null;
  }
} 
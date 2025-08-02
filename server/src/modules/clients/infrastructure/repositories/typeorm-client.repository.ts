import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CLIENT_REPOSITORY_TOKEN, ClientRepository } from "../../domain/repositories/client.repository.interface";
import { Client } from "../../domain/entities/client.entity";
import { ClientSchema } from "../typeorm/client.schema";

@Injectable()
export class TypeOrmClientRepository implements ClientRepository {
  constructor(
    @InjectRepository(ClientSchema)
    private readonly repo: Repository<ClientSchema>,
  ) {}

  async findAll(): Promise<Client[]> {
    const schemas = await this.repo.find();
    return schemas.map(
      (s) => new Client({ id: s.id, name: s.name, url: s.url }),
    );
  }

  async findById(id: number): Promise<Client | null> {
    const s = await this.repo.findOne({ where: { id } });
    return s ? new Client({ id: s.id, name: s.name, url: s.url }) : null;
  }
} 
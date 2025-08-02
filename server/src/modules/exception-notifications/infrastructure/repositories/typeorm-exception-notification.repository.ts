import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EXCEPTION_NOTIFICATION_REPOSITORY_TOKEN, ExceptionNotificationRepository } from "../../domain/repositories/exception-notification.repository.interface";
import { ExceptionNotification } from "../../domain/entities/exception-notification.entity";
import { ExceptionNotificationSchema } from "../typeorm/exception-notification.schema";

@Injectable()
export class TypeOrmExceptionNotificationRepository implements ExceptionNotificationRepository {
  constructor(
    @InjectRepository(ExceptionNotificationSchema)
    private readonly repo: Repository<ExceptionNotificationSchema>,
  ) {}

  async findAll(): Promise<ExceptionNotification[]> {
    const schemas = await this.repo.find({ relations: ['exception', 'user'] });
    return schemas.map(
      s => new ExceptionNotification({
        id: s.id,
        executionId: s.exception.id,
        userId: s.user.id,
        method: s.method,
      }),
    );
  }

  async findById(id: number): Promise<ExceptionNotification | null> {
    const s = await this.repo.findOne({ where: { id }, relations: ['exception', 'user'] });
    return s
      ? new ExceptionNotification({
          id: s.id,
          executionId: s.exception.id,
          userId: s.user.id,
          method: s.method,
        })
      : null;
  }
} 
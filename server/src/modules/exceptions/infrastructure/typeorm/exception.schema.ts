import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { BaseSchema } from "../../../../shared/entities/base.schema";
import { ExecutionSchema } from "../../../executions/infrastructure/typeorm/execution.schema";
import { ExceptionNotificationSchema } from "../../../exception-notifications/infrastructure/typeorm/exception-notification.schema";

@Entity("exceptions")
export class ExceptionSchema extends BaseSchema {

  @ManyToOne(() => ExecutionSchema, execution => execution.exceptions)
  @JoinColumn({ name: "execution_id" })
  execution: ExecutionSchema;

  @Column({ name: "exception_type" })
  exceptionType: string;

  @Column()
  severity: string;

  @Column({ type: "text", nullable: true })
  remedy: string | null;

  @OneToMany(() => ExceptionNotificationSchema, notification => notification.exception)
  exceptionNotifications: ExceptionNotificationSchema[];
} 
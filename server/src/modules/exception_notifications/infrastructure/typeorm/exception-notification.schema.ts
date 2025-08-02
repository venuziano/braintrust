import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { ExceptionSchema } from "../../../exceptions/infrastructure/typeorm/exception.schema";
import { UserSchema } from "../../../users/infrastructure/typeorm/user.schema";

@Entity("exception_notifications")
export class ExceptionNotificationSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ExceptionSchema, exception => exception.exceptionNotifications)
  @JoinColumn({ name: "exception_id" })
  exception: ExceptionSchema;

  @ManyToOne(() => UserSchema)
  @JoinColumn({ name: "user_id" })
  user: UserSchema;

  @Column()
  method: string;
} 
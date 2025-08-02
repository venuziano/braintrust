import { ExceptionNotification } from "../entities/exception-notification.entity";

export const EXCEPTION_NOTIFICATION_REPOSITORY_TOKEN = "ExceptionNotificationRepository";

export interface ExceptionNotificationRepository {
  findAll(): Promise<ExceptionNotification[]>;
  findById(id: number): Promise<ExceptionNotification | null>;
} 
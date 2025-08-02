import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExceptionNotificationSchema } from './infrastructure/typeorm/exception-notification.schema';
import { EXCEPTION_NOTIFICATION_REPOSITORY_TOKEN } from './domain/repositories/exception-notification.repository.interface';
import { TypeOrmExceptionNotificationRepository } from './infrastructure/repositories/typeorm-exception-notification.repository';


@Module({
  imports: [TypeOrmModule.forFeature([ExceptionNotificationSchema])],
  providers: [
    { provide: EXCEPTION_NOTIFICATION_REPOSITORY_TOKEN, useClass: TypeOrmExceptionNotificationRepository },
  ],
  exports: [TypeOrmModule],
})
export class ExceptionNotificationsModule {} 
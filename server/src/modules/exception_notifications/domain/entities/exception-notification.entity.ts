export interface ExceptionNotificationProps {
  id: number;
  executionId: number;
  userId: number;
  method: string;
}

export class ExceptionNotification {
  constructor(private props: ExceptionNotificationProps) {}

  get id(): number {
    return this.props.id;
  }

  get executionId(): number {
    return this.props.executionId;
  }

  get userId(): number {
    return this.props.userId;
  }

  get method(): string {
    return this.props.method;
  }
} 
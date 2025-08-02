export interface ExceptionProps {
  id: number;
  executionId: number;
  exceptionType: string;
  severity: string;
  remedy: string | null;
}

export class Exception {
  constructor(private props: ExceptionProps) {}

  get id(): number {
    return this.props.id;
  }

  get executionId(): number {
    return this.props.executionId;
  }

  get exceptionType(): string {
    return this.props.exceptionType;
  }

  get severity(): string {
    return this.props.severity;
  }

  get remedy(): string | null {
    return this.props.remedy;
  }
} 
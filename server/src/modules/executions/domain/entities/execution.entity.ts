export interface ExecutionProps {
  id: number;
  workflowId: number;
  succeeded: boolean;
  timeTaken: string | null; // PostgreSQL interval as string
  costSaved: number | null; // numeric(10, 2)
}

export class Execution {
  constructor(private props: ExecutionProps) {}

  get id(): number {
    return this.props.id;
  }

  get workflowId(): number {
    return this.props.workflowId;
  }

  get succeeded(): boolean {
    return this.props.succeeded;
  }

  get timeTaken(): string | null {
    return this.props.timeTaken;
  }

  get costSaved(): number | null {
    return this.props.costSaved;
  }
} 
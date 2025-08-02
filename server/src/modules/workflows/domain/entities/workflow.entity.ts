export interface WorkflowProps {
  id: number;
  clientId: number;
  departmentId: number;
  name: string;
  description: string | null;
  timeSavedPerExec: string | null; // PostgreSQL interval as string
  costSavedPerExec: number | null; // numeric(10, 2)
}

export class Workflow {
  constructor(private props: WorkflowProps) {}

  get id(): number {
    return this.props.id;
  }

  get clientId(): number {
    return this.props.clientId;
  }

  get departmentId(): number {
    return this.props.departmentId;
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string | null {
    return this.props.description;
  }

  get timeSavedPerExec(): string | null {
    return this.props.timeSavedPerExec;
  }

  get costSavedPerExec(): number | null {
    return this.props.costSavedPerExec;
  }
} 
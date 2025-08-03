export interface PipelinePhaseProps {
  id: number;
  name: string;
  order: number;
  description?: string;
}

export class PipelinePhase {
  constructor(private props: PipelinePhaseProps) {}

  public static fromProps(props: PipelinePhaseProps): PipelinePhase {
    return new PipelinePhase(props);
  }

  get id(): number { return this.props.id; }
  get name(): string { return this.props.name; }
  get order(): number { return this.props.order; }
  get description(): string | undefined { return this.props.description; }

  public toProps(): PipelinePhaseProps {
    return { ...this.props };
  }
} 
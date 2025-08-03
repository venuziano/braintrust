export type PipelinePhaseStatus = 'not_started' | 'in_progress' | 'completed';

export interface PipelineProgressProps {
  clientId: number;
  pipelinePhaseId: number;
  status: PipelinePhaseStatus;
  completedAt?: Date;
  phaseName: string;
  phaseOrder: number;
}

export class PipelineProgress {
  constructor(private props: PipelineProgressProps) {}

  public static fromProps(props: PipelineProgressProps): PipelineProgress {
    return new PipelineProgress(props);
  }

  get clientId(): number { return this.props.clientId; }
  get pipelinePhaseId(): number { return this.props.pipelinePhaseId; }
  get status(): PipelinePhaseStatus { return this.props.status; }
  get completedAt(): Date | undefined { return this.props.completedAt; }
  get phaseName(): string { return this.props.phaseName; }
  get phaseOrder(): number { return this.props.phaseOrder; }

  public toProps(): PipelineProgressProps {
    return { ...this.props };
  }
} 
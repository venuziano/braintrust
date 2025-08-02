import { formatDuration } from 'src/shared/entities/helpers';

export interface ClientMetricsProps {
  id: number;
  name: string;
  contractStart: string | null;
  workflowsCount: number;
  nodesCount: number;
  executionsCount: number;
  exceptionsCount: number;
  revenue: number;
  timeSavedInSeconds: number;
  moneySaved: number;
}

export class ClientMetrics {
  private constructor(private props: ClientMetricsProps) {}

  public static fromProps(p: ClientMetricsProps) {
    return new ClientMetrics(p);
  }

  public getTimeSavedFormatted(): string {
    return formatDuration(this.props.timeSavedInSeconds);
  }

  public toProps(): ClientMetricsProps {
    return { ...this.props };
  }
}

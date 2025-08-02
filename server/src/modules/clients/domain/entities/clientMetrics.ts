import { Client } from './client.entity';

export interface ClientMetricsProps {
  client: Client;
  contractStart: string | null;
  workflowsCount: number;
  nodesCount: number;
  executionsCount: number;
  exceptionsCount: number;
  revenue: number;
  timeSaved: string;
  moneySaved: number;
}

export class ClientMetrics {
  private constructor(private props: ClientMetricsProps) {}

  public static fromProps(p: ClientMetricsProps) {
    return new ClientMetrics(p);
  }

  public toProps(): ClientMetricsProps {
    return { ...this.props };
  }
}

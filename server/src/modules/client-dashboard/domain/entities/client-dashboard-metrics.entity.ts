export interface ClientDashboardMetricsProps {
  readonly timeSavedLast7Days: number;
  readonly timeSavedAllTime: number;
  readonly moneySavedLast7Days: number;
  readonly moneySavedAllTime: number;
  readonly activeWorkflows: number;
}

export class ClientDashboardMetrics {
  constructor(private readonly props: ClientDashboardMetricsProps) {}

  static fromProps(props: ClientDashboardMetricsProps): ClientDashboardMetrics {
    return new ClientDashboardMetrics(props);
  }

  toProps(): ClientDashboardMetricsProps {
    return { ...this.props };
  }

  // Getters
  get timeSavedLast7Days(): number { return this.props.timeSavedLast7Days; }
  get timeSavedAllTime(): number { return this.props.timeSavedAllTime; }
  get moneySavedLast7Days(): number { return this.props.moneySavedLast7Days; }
  get moneySavedAllTime(): number { return this.props.moneySavedAllTime; }
  get activeWorkflows(): number { return this.props.activeWorkflows; }
} 
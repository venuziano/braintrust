export interface SolutionsEngineerProfileProps {
  readonly name: string;
  readonly email: string;
}

export class SolutionsEngineerProfile {
  constructor(private readonly props: SolutionsEngineerProfileProps) {}

  static fromProps(props: SolutionsEngineerProfileProps): SolutionsEngineerProfile {
    return new SolutionsEngineerProfile(props);
  }

  toProps(): SolutionsEngineerProfileProps {
    return { ...this.props };
  }

  // Getters
  get name(): string { return this.props.name; }
  get email(): string { return this.props.email; }
} 
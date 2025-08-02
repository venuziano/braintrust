export interface ClientProps {
  id: number;
  name: string;
  url: string | null;
}

export class Client {
  constructor(private props: ClientProps) {}

  public static fromProps(props: ClientProps): Client {
    return new Client(props);
  }

  get id(): number {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get url(): string | null {
    return this.props.url;
  }

  public toProps(): ClientProps {
    return { ...this.props };
  }
}

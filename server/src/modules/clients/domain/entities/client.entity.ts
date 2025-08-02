export interface ClientProps {
  id: number;
  name: string;
  url: string | null;
}

export class Client {
  constructor(private props: ClientProps) {}

  get id(): number {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get url(): string | null {
    return this.props.url;
  }
} 
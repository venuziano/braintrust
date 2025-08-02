export interface DepartmentProps {
  id: number;
  clientId: number;
  name: string;
}

export class Department {
  constructor(private props: DepartmentProps) {}

  get id(): number {
    return this.props.id;
  }

  get clientId(): number {
    return this.props.clientId;
  }

  get name(): string {
    return this.props.name;
  }
} 
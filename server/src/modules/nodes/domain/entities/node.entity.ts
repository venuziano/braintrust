export interface NodeProps {
  id: number;
  workflowId: number;
  name: string;
  nodeType: string;
  settings: Record<string, unknown> | null;
}

export class Node {
  constructor(private props: NodeProps) {}

  get id(): number {
    return this.props.id;
  }

  get workflowId(): number {
    return this.props.workflowId;
  }

  get name(): string {
    return this.props.name;
  }

  get nodeType(): string {
    return this.props.nodeType;
  }

  get settings(): Record<string, unknown> | null {
    return this.props.settings;
  }
} 
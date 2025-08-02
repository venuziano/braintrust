import { Node } from "../entities/node.entity";

export const NODE_REPOSITORY_TOKEN = "NodeRepository";

export interface NodeRepository {
  findAll(): Promise<Node[]>;
  findById(id: number): Promise<Node | null>;
} 
/**
 * Base properties interface for all entities
 * Contains common fields for auditing and soft deletion
 */
export interface BaseEntityProps {
  readonly id: number;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  readonly deletedAt?: Date | null;
}

/**
 * Base entity class with common audit fields and soft deletion support
 * All domain entities should extend this class
 */
export abstract class BaseEntity {
  protected constructor(protected readonly props: BaseEntityProps) {}

  /**
   * Gets the entity's unique identifier
   */
  public get id(): number {
    return this.props.id;
  }

  /**
   * Gets the creation timestamp
   */
  public get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  /**
   * Gets the last update timestamp
   */
  public get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  /**
   * Gets the soft deletion timestamp
   */
  public get deletedAt(): Date | null | undefined {
    return this.props.deletedAt;
  }

  /**
   * Checks if the entity is soft deleted
   */
  public get isDeleted(): boolean {
    return this.props.deletedAt !== null && this.props.deletedAt !== undefined;
  }

  /**
   * Returns all properties as a plain object
   */
  public toProps(): BaseEntityProps {
    return { ...this.props };
  }
} 
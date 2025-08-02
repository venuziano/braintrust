import { BaseEntityProps, BaseEntity } from "src/shared/entities/base.entity";


/**
 * User domain entity properties extending base entity properties
 */
export interface UserProps extends BaseEntityProps {
  readonly name: string;
  readonly email: string;
  readonly phone: string | null;
  readonly passwordHash: string;
}

/**
 * User domain entity with business rules and validation
 * Extends BaseEntity for common audit fields and soft deletion
 */
export class User extends BaseEntity {
  protected constructor(props: UserProps) {
    super(props);
  }

  /**
   * Creates a new User instance
   */
  public static create(props: Omit<UserProps, 'id'>): User {
    this.validateEmail(props.email);
    this.validateName(props.name);
    this.validatePasswordHash(props.passwordHash);

    return new User({
      ...props,
      id: 0, // Will be set by repository
    });
  }

  /**
   * Creates User instance from existing data (e.g., from database)
   */
  public static fromProps(props: UserProps): User {
    return new User(props);
  }

  // Getters for user-specific properties
  public get name(): string {
    return (this.props as UserProps).name;
  }

  public get email(): string {
    return (this.props as UserProps).email;
  }

  public get phone(): string | null {
    return (this.props as UserProps).phone;
  }

  public get passwordHash(): string {
    return (this.props as UserProps).passwordHash;
  }

  /**
   * Returns all properties as a plain object
   */
  public toProps(): UserProps {
    return { ...(this.props as UserProps) };
  }

  // Business rules validation
  private static validateEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }
  }

  private static validateName(name: string): void {
    if (!name || name.trim().length < 2) {
      throw new Error('Name must be at least 2 characters long');
    }
  }

  private static validatePasswordHash(passwordHash: string): void {
    if (!passwordHash || passwordHash.length < 8) {
      throw new Error('Password hash is required');
    }
  }
} 
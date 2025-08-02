import { User } from '../entities/user.entity';

/**
 * Injection token for the UserRepositoryInterface
 */
export const USER_REPOSITORY_TOKEN = Symbol('UserRepositoryInterface');

/**
 * Repository interface for User entity operations
 * Defines the contract for data access without implementation details
 */
export interface UserRepositoryInterface {
  /**
   * Retrieves all users from the data store
   * @returns Promise<User[]> Array of all users
   */
  findAll(): Promise<User[]>;

  /**
   * Finds a user by their unique identifier
   * @param id - The user's unique identifier
   * @returns Promise<User | null> The user if found, null otherwise
   */
  findById(id: number): Promise<User | null>;

  /**
   * Finds a user by their email address
   * @param email - The user's email address
   * @returns Promise<User | null> The user if found, null otherwise
   */
  findByEmail(email: string): Promise<User | null>;

  /**
   * Saves a user to the data store
   * @param user - The user entity to save
   * @returns Promise<User> The saved user with updated properties
   */
  save(user: User): Promise<User>;

  /**
   * Deletes a user from the data store
   * @param id - The unique identifier of the user to delete
   * @returns Promise<void>
   */
  delete(id: number): Promise<void>;
} 
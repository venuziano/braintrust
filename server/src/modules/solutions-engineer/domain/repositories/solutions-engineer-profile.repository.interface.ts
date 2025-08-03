import { SolutionsEngineerProfile } from '../entities/solutions-engineer-profile.entity';

export const SOLUTIONS_ENGINEER_PROFILE_REPOSITORY_TOKEN = 'SOLUTIONS_ENGINEER_PROFILE_REPOSITORY_TOKEN';

export interface SolutionsEngineerProfileRepository {
  getSolutionsEngineerByClientId(clientId: number): Promise<SolutionsEngineerProfile | null>;
} 
import { Injectable, Inject } from '@nestjs/common';
import { SOLUTIONS_ENGINEER_PROFILE_REPOSITORY_TOKEN, SolutionsEngineerProfileRepository } from '../../domain/repositories/solutions-engineer-profile.repository.interface';
import { GetSolutionsEngineerProfileResponse } from '../dto/get-solutions-engineer-profile.dto';
import { SolutionsEngineerProfile } from '../../domain/entities/solutions-engineer-profile.entity';

@Injectable()
export class GetSolutionsEngineerProfileUseCase {
  constructor(
    @Inject(SOLUTIONS_ENGINEER_PROFILE_REPOSITORY_TOKEN)
    private readonly solutionsEngineerProfileRepo: SolutionsEngineerProfileRepository,
  ) {}

  async execute(clientId: number): Promise<GetSolutionsEngineerProfileResponse | null> {
    const seProfile = await this.solutionsEngineerProfileRepo.getSolutionsEngineerByClientId(clientId);
    
    if (!seProfile) {
      return null;
    }

    const props = seProfile.toProps();
    return {
      name: props.name,
      email: props.email,
    };
  }
} 
import { Injectable } from '@nestjs/common';
import { GetAllRolesUseCase } from './application/use-cases/get-all-roles.use-case';
import { GetAllRolesResponseSchema } from './application/dto/get-all-roles.dto';
import { t } from '../../infrastructure/trpc/trpc.shared';

@Injectable()
export class RolesController {
  constructor(private readonly getAllRolesUseCase: GetAllRolesUseCase) {}

  createRouter() {
    return t.router({
      getAll: t.procedure
        .output(GetAllRolesResponseSchema)
        .query(async () => {
          return this.getAllRolesUseCase.execute();
        }),
    });
  }
} 
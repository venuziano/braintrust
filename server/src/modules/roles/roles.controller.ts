import { Injectable } from '@nestjs/common';
import { initTRPC } from '@trpc/server';
import { GetAllRolesUseCase } from './application/use-cases/get-all-roles.use-case';
import { GetAllRolesResponseSchema } from './application/dto/get-all-roles.dto';

const t = initTRPC.create();

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
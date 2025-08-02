import { z } from 'zod';

/**
 * Zod schema for a single role response
 */
export const RoleResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
});

/**
 * Zod schema for getAllRoles response
 */
export const GetAllRolesResponseSchema = z.array(RoleResponseSchema);

export type RoleResponse = z.infer<typeof RoleResponseSchema>;
export type GetAllRolesResponse = z.infer<typeof GetAllRolesResponseSchema>; 
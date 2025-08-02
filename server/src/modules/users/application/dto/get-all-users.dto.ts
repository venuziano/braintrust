import { z } from 'zod';

/**
 * Zod schema for user response
 */
export const UserResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().nullable(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().nullable().optional(),
});

/**
 * Zod schema for get all users response
 */
export const GetAllUsersResponseSchema = z.array(UserResponseSchema);

/**
 * TypeScript types derived from Zod schemas
 */
export type UserResponse = z.infer<typeof UserResponseSchema>;
export type GetAllUsersResponse = z.infer<typeof GetAllUsersResponseSchema>; 
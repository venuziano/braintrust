import { z } from 'zod';

export const GetSolutionsEngineerProfileResponseSchema = z.object({
  name: z.string(),
  email: z.email(),
});

export type GetSolutionsEngineerProfileResponse = z.infer<typeof GetSolutionsEngineerProfileResponseSchema>; 
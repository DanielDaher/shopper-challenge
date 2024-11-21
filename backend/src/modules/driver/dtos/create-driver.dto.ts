import { z } from 'zod';

export type CreateDriverDto = z.output<typeof CreateDriver>;
export const CreateDriver = z.object({
  name: z.string().max(512),
  status: z.enum(['ativo', 'inativo']).default('ativo'),
  description: z.string().max(512),
  car: z.string().max(512),
  review: z.string().max(512).default(""),
  minKm: z.number().int().min(1).default(1),
  tax: z.number().nonnegative(),
  imageUrl: z.string().url().optional(),
  code: z.string().max(32).optional(),
  codeExpiresIn: z.date().optional(),
});

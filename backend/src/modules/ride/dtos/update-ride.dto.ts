
import { z } from 'zod';

export type UpdateRideDto = z.output<typeof UpdateRide>;
export const UpdateRide = z.object({
  customerId: z.number().int(),
  origin: z.string().min(1).max(512),
  destination: z.string().min(1).max(512),
  distance: z.number().int(),
  duration: z.string().max(512),
  driver: z.object({
    id: z.number().int(),
    name: z.string().max(512),
  }),
  value: z.number(),
}).partial()
.refine(
  (data) => data.origin !== data.destination,
  {
    message: 'Os campos \'origin\' e \'destination\' não podem ser iguais.',
    path: ['destination'],
  },
);

import { z } from 'zod';

export type CreateRideDto = z.output<typeof CreateRide>;
export const CreateRide = z.object({
  customerId: z.number().int(),
  driverId: z.number().int(),
  origin: z.string().max(512),
  destination: z.string().max(512),
  distance: z.string().max(512),
  duration: z.string().max(512),
  value: z.number().optional(),
});

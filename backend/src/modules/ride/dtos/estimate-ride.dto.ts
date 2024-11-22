import { z } from 'zod';

export type EstimateRideDto = z.output<typeof EstimateRide>;
export const EstimateRide = z.object({
  customerId: z.number().int(),
  origin: z.string().max(512),
  destination: z.string().max(512),
});

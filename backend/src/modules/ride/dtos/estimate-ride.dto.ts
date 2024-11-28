import { z } from 'zod';

const message = 'Os dados fornecidos no corpo da requisição são inválidos';

export type EstimateRideDto = z.output<typeof EstimateRide>;
export const EstimateRide = z.object({
  customerId: z.number({ message }).int({ message }),
  origin: z.string({ message }).min(1, { message }).max(512),
  destination: z.string({ message }).min(1, { message }).max(512),
})
.refine(
  (data) => data.origin !== data.destination,
  {
    message: 'Os campos \'origin\' e \'destination\' não podem ser iguais.',
    path: ['destination'],
  },
);

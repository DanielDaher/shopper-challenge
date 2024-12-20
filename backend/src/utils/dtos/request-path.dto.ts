import { z } from 'zod';

export type RequestPathDto = z.output<typeof RequestPath>;
export const RequestPath = z.object({
  id: z.coerce.number().positive().int(),
});

export const CustomerRequestPath = z.object({
  // eslint-disable-next-line camelcase
  customer_id: z.coerce.number().positive().int(),
});

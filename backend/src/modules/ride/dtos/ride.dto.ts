import { Prisma } from '@prisma/client';

export const RideDto = Prisma.validator<Prisma.RideSelect>()({
  id: true,
  customerId: true,
  driverId: true,
  origin: true,
  destination: true,
  distance: true,
  duration: true,
  value: true,
  driver: {
    select: {
      id: true,
      name: true,
    },
  },
  customer: {
    select: {
      id: true,
      name: true,
      email: true,
    },
  },
});

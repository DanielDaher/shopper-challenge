import { Prisma } from '@prisma/client';

export const FindRideByCostumerDto = Prisma.validator<Prisma.RideSelect>()({
  id: true,
  createdAt: true,
  origin: true,
  destination: true,
  distance: true,
  duration: true,
  driver: {
    select: {
      id: true,
      name: true,
    },
  },
  value: true,
});

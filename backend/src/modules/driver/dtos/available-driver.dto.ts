import { Prisma } from '@prisma/client';

export type AvailableDriverDtoType = Prisma.DriverGetPayload<{
  select: typeof AvailableDriverDto;
}>;

export const AvailableDriverDto = Prisma.validator<Prisma.DriverSelect>()({
  id: true,
  name: true,
  description: true,
  vehicle: true,
  reviews: {
    select: {
      rating: true,
      comment: true,
    },
  },
  value: true,
} satisfies Prisma.DriverSelect);

import { Prisma } from '@prisma/client';

export const DriverDto = Prisma.validator<Prisma.DriverSelect>()({
  id: true,
  role: true,
  name: true,
  status: true,
  description: true,
  car: true,
  review: true,
  minKm: true,
  tax: true,
  imageUrl: true,
  code: true,
  codeExpiresIn: true,
  createdAt: true,
  updatedAt: true,
  rides: {
    select: {
      id: true,
      origin: true,
      destination: true,
      value: true,
    },
  },
});

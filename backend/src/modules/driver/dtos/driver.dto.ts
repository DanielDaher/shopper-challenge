import { Prisma } from '@prisma/client';

export const DriverDto = Prisma.validator<Prisma.DriverSelect>()({
  id: true,
  role: true,
  name: true,
  status: true,
  description: true,
  vehicle: true,
  minKm: true,
  value: true,
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
  reviews: true,
});

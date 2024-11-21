
import DataSource from '@database/data-source';

import { Prisma } from '@prisma/client';
import { RideDto } from './dtos/ride.dto';
import { CreateRideDto } from './dtos/create-ride.dto';

class Repository {
  constructor(private readonly repository = DataSource.ride) {}

  public findAll(size: number, page: number, search?: string) {
    const where: Prisma.RideWhereInput = {};

    return DataSource.$transaction([
      this.repository.findMany({
        where,
        take: size,
        skip: ((page - 1) * size),
        select: RideDto,
      }),
      this.repository.count({ where }),
    ]);
  }

  public findAllNoPagination(search?: string) {
    const where: Prisma.RideWhereInput = {};

    return this.repository.findMany({
      where,
      select: RideDto,
    });
  }

  public findOne(id: number) {
    return this.repository.findUnique({
      where: { id },
      select: RideDto,
    });
  }

  public findRidesByCustomer(customerId: number, driverId?: number) {
    const where: Prisma.RideWhereInput = { customerId, driverId };

    return this.repository.findMany({
      where,
      select: RideDto,
    });
  }

  public createOne(data: CreateRideDto) {
    return this.repository.create({
      data,
      select: RideDto,
    });
  }

  public updateOne(id: number, data: Prisma.RideUpdateInput) {
    return this.repository.update({
      where: { id },
      data,
      select: RideDto,
    });
  }

  public deleteOne(id: number) {
    return this.repository.delete({
      where: { id },
      select: RideDto,
    });
  }
}

export default new Repository();

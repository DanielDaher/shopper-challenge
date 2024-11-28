
import DataSource from '@database/data-source';

import { Prisma } from '@prisma/client';
import { RideDto } from './dtos/ride.dto';
import { CreateRideDto } from './dtos/create-ride.dto';
import { UpdateRideDto } from './dtos/update-ride.dto';
import { FindRideByCostumerDto } from './dtos/find-ride-by-costumer.dto';

class Repository {
  constructor(private readonly repository = DataSource.ride) {}

  public findAll(size: number, page: number, search?: string) {
    const where: Prisma.RideWhereInput = {
      AND: [
        { OR:
          [
            { origin: { contains: search } },
            { destination: { contains: search } },
          ],
        },
      ],
    };

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
    const where: Prisma.RideWhereInput = {
      AND: [
        { OR:
          [
            { origin: { contains: search } },
            { destination: { contains: search } },
          ],
        },
      ],
    };

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
      select: FindRideByCostumerDto,
    });
  }

  public async createOne(data: CreateRideDto) {
    const { driver, ...rideData } = data;

    return await DataSource.$transaction( async( trx ) => {
      return await trx.ride.create({
        data: {
          ...rideData,
          driver: { connect: { id: driver.id } },
        },
        select: RideDto,
      });
    });
  }

  public async updateOne(id: number, data: UpdateRideDto) {
    const { driver, ...rideData } = data;

    return await DataSource.$transaction( async( trx ) => {
      return await trx.ride.update({
        where: { id },
        data: {
          ...rideData,
          driver: driver ? { connect: { id: driver.id } } : undefined,
        },
        select: RideDto,
      });
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

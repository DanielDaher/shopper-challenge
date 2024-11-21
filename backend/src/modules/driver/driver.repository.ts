
import DataSource from '@database/data-source';

import { Prisma } from '@prisma/client';
import { DriverDto } from './dtos/driver.dto';

class Repository {
  constructor(private readonly repository = DataSource.driver) {}

  public findAll(size: number, page: number, search?: string) {
    const where: Prisma.DriverWhereInput = {};

    return DataSource.$transaction([
      this.repository.findMany({
        where,
        take: size,
        skip: ((page - 1) * size),
        select: DriverDto,
      }),
      this.repository.count({ where }),
    ]);
  }

  public findAllNoPagination(search?: string) {
    const where: Prisma.DriverWhereInput = {};

    return this.repository.findMany({
      where,
      select: DriverDto,
    });
  }

  public findOne(id: number) {
    return this.repository.findUnique({
      where: { id },
      select: DriverDto,
    });
  }

  public createOne(data: Prisma.DriverCreateInput) {
    return this.repository.create({
      data,
      select: DriverDto,
    });
  }

  public updateOne(id: number, data: Prisma.DriverUpdateInput) {
    return this.repository.update({
      where: { id },
      data,
      select: DriverDto,
    });
  }

  public deleteOne(id: number) {
    return this.repository.delete({
      where: { id },
      select: DriverDto,
    });
  }
}

export default new Repository();

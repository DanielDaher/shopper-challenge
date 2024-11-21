
import Repository from './ride.repository';

import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';
import PaginationHelper from '@helpers/pagination.helper';

import { CreateRideDto } from './dtos/create-ride.dto';
import { UpdateRideDto } from './dtos/update-ride.dto';
import driverService from '@modules/driver/driver.service';
import registerService from '@modules/register/register.service';

class Service {
  public async findAll(size: number, page: number, search?: string) {
    const rides = await Repository.findAll(size, page, search);

    return PaginationHelper.paginate(rides, size, page);
  }

  public async findAllNoPagination(search?: string) {
    return await Repository.findAllNoPagination(search);
  }

  public async findOne(id: number) {
    const ride = await Repository.findOne(id);

    if (!ride) {
      throw new AppException(404, ErrorMessages.RIDE_NOT_FOUND);
    }
    return ride;
  }

  public async findRidesByCustomer(customerId: number, driverId?: number) {
    await registerService.findOne(customerId);

    if (driverId) {
      await driverService.findOne(driverId);
    }
  
    const rides = await Repository.findRidesByCustomer(customerId, driverId);

    if (!rides) {
      throw new AppException(404, ErrorMessages.NO_RIDES_FOUND);
    }
    return rides;
  }

  public async createOne(data: CreateRideDto) {
    return await Repository.createOne(data);
  }

  public async updateOne(id: number, data: UpdateRideDto) {
    const ride = await this.findOne(id);

    return await Repository.updateOne(ride.id, data);
  }

  public async deleteOne(id: number) {
    const ride = await this.findOne(id);

    return await Repository.deleteOne(ride.id);
  }
}

export default new Service();

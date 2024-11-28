
import Repository from './driver.repository';

import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';
import PaginationHelper from '@helpers/pagination.helper';

import { CreateDriverDto } from './dtos/create-driver.dto';
import { UpdateDriverDto } from './dtos/update-driver.dto';
import ErrorCode from '@errors/error-code';

class Service {
  public async findAll(size: number, page: number, search?: string) {
    const drivers = await Repository.findAll(size, page, search);

    return PaginationHelper.paginate(drivers, size, page);
  }

  public async findAllNoPagination(search?: string) {
    return await Repository.findAllNoPagination(search);
  }

  public async findOne(id: number, invalidDriverError?: boolean) {
    const driver = await Repository.findOne(id);

    if (!driver) {
      if (invalidDriverError) throw new AppException(404, ErrorCode.INVALID_DRIVER, ErrorMessages.INVALID_DRIVER);
      throw new AppException(404, ErrorCode.DRIVER_NOT_FOUND, ErrorMessages.INVALID_DRIVER);
    }
    return driver;
  }

  public async createOne(data: CreateDriverDto) {
    return await Repository.createOne(data);
  }

  public async updateOne(id: number, data: UpdateDriverDto) {
    const driver = await this.findOne(id);

    return await Repository.updateOne(driver.id, data);
  }

  public async deleteOne(id: number) {
    const driver = await this.findOne(id);

    return await Repository.deleteOne(driver.id);
  }
}

export default new Service();

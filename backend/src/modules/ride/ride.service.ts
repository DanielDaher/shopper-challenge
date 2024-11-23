
import Repository from './ride.repository';

import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';
import PaginationHelper from '@helpers/pagination.helper';

import { CreateRideDto } from './dtos/create-ride.dto';
import { UpdateRideDto } from './dtos/update-ride.dto';
import driverService from '@modules/driver/driver.service';
import registerService from '@modules/register/register.service';
import googleApiRoutes from 'integrations/google-api-routes';
import { EstimateRideDto } from './dtos/estimate-ride.dto';
import { RouteRequest } from 'integrations/google-api-routes/compute-routes-body.interface';
import { EstimateRideResponse } from './interfaces/estimate-ride-response.interface';
import driverRepository from '@modules/driver/driver.repository';
import { AvailableDriverDtoType } from '@modules/driver/dtos/available-driver.dto';

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

  public async estimateRide(data: EstimateRideDto) {
    const body: RouteRequest = {
      origin: {
        vehicleStopover: false,
        sideOfRoad: false,
        address: data.origin,
      },
      destination: {
        vehicleStopover: false,
        sideOfRoad: false,
        address: data.destination,
      },
      travelMode: 'DRIVE',
      routingPreference: 'TRAFFIC_UNAWARE',
      polylineQuality: 'high_quality',
      computeAlternativeRoutes: false,
      routeModifiers: {
        avoidTolls: false,
        avoidHighways: false,
        avoidFerries: false,
        avoidIndoor: false,
      },
    };

    const computedRoutes = await googleApiRoutes.computeRoutes(body);
    const distance = +computedRoutes.routes[0].localizedValues.distance.text;
    const duration = computedRoutes.routes[0].localizedValues.duration.text;
    const availableDrivers = await this.findAvailableDrivers(distance);

    const fullResponse: EstimateRideResponse = {
      origin: {
        latitude: computedRoutes.routes[0].viewport.low.latitude,
        longitude:computedRoutes.routes[0].viewport.low.longitude,
      },
      destination: {
        latitude: computedRoutes.routes[0].viewport.high.latitude,
        longitude:computedRoutes.routes[0].viewport.high.longitude,
      },
      distance,
      duration,
      options: availableDrivers, // o problema aqui está no campo reviews/review. Talvez eu tenha que transformar num json lá no schema prisma
      routeResponse: computedRoutes,
    };
    return fullResponse;
  }

  public async findAvailableDrivers(distance: number): Promise<AvailableDriverDtoType[]> {
    const drivers = await driverRepository.findAvailableDrivers(distance);
    return drivers;
  }
  // public async calculatePrice(driverId: number, ) {}

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

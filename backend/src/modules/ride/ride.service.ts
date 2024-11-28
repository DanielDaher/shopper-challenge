
import Repository from './ride.repository';

import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';
import PaginationHelper from '@helpers/pagination.helper';

import { CreateRideDto } from './dtos/create-ride.dto';
import { UpdateRideDto } from './dtos/update-ride.dto';
import driverService from '@modules/driver/driver.service';
import googleApiRoutes from 'integrations/google-api-routes';
import { EstimateRideDto } from './dtos/estimate-ride.dto';
import { RouteRequest } from 'integrations/google-api-routes/compute-routes-body.interface';
import { EstimateRideResponse } from './interfaces/estimate-ride-response.interface';
import driverRepository from '@modules/driver/driver.repository';
import { AvailableDriverDtoType } from '@modules/driver/dtos/available-driver.dto';
import { ComputeRouteResponse } from 'integrations/google-api-routes/compute-routes-response.interface';
import { Coordinates } from 'integrations/google-api-routes/get-coordinates-response.interface';
import ErrorCode from '@errors/error-code';

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
      throw new AppException(404, ErrorCode.NO_RIDES_FOUND, ErrorMessages.RIDE_NOT_FOUND);
    }
    return ride;
  }

  public async findRidesByCustomer(customerId: number, driverId?: number) {
    if (driverId) {
      await driverService.findOne(driverId, true);
    }

    const rides = await Repository.findRidesByCustomer(customerId, driverId);

    if (!rides || !rides.length) {
      throw new AppException(404, ErrorCode.NO_RIDES_FOUND, ErrorMessages.NO_RIDES_FOUND);
    }

    const formattedRides = rides.map(({ createdAt, ...ride }) => ({
      ...ride,
      date: createdAt,
    }));
    // eslint-disable-next-line camelcase
    return { customer_id: customerId, rides: formattedRides };
  }

  public async estimateRide(data: EstimateRideDto) {
    const body: RouteRequest = this.formatBodyToEstimateRideRequest(data);
    const originCoordinates = await googleApiRoutes.getCoordinates(data.origin);
    const destinationCoordinates = await googleApiRoutes.getCoordinates(data.destination);
    const computedRoutes = await googleApiRoutes.computeRoutes(body);

    const distance = +computedRoutes.routes[0].distanceMeters;
    const availableDrivers = await this.findAvailableDrivers(distance);

    const fullResponse: EstimateRideResponse = this.formatResponseToEstimateRideRequest(
      computedRoutes,
      availableDrivers,
      originCoordinates,
      destinationCoordinates,
    );

    return fullResponse;
  }

  public async findAvailableDrivers(distance: number): Promise<AvailableDriverDtoType[]> {
    const drivers = await driverRepository.findAvailableDrivers(distance);
    return drivers;
  }

  public formatBodyToEstimateRideRequest(data: EstimateRideDto): RouteRequest {
    return {
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
  }

  public formatResponseToEstimateRideRequest(
    computedRoutes: ComputeRouteResponse,
    drivers: AvailableDriverDtoType[],
    originCoordinates: Coordinates,
    destinationCoordinates: Coordinates,
  ): EstimateRideResponse {

    const distance = +computedRoutes.routes[0].distanceMeters;
    const duration = computedRoutes.routes[0].localizedValues.duration.text;

    const formattedDrivers = drivers.map((driver) => this.formatDriverFields(driver, distance));

    const fullResponse: EstimateRideResponse = {
      origin: {
        latitude: originCoordinates.lat || computedRoutes.routes[0].viewport.low.latitude,
        longitude:originCoordinates.lng || computedRoutes.routes[0].viewport.low.longitude,
      },
      destination: {
        latitude: destinationCoordinates.lat || computedRoutes.routes[0].viewport.high.latitude,
        longitude: destinationCoordinates.lng || computedRoutes.routes[0].viewport.high.longitude,
      },
      distance,
      duration,
      options: formattedDrivers,
      routeResponse: computedRoutes,
    };

    return fullResponse;
  }

  public formatDriverFields(driver: AvailableDriverDtoType, distance: number) {
    const { id, name, description, vehicle, value } = driver;

    const totalValue = this.calculateTotalPrice(value, distance);
    const review = {
      rating: driver.reviews[0].rating,
      comment: driver.reviews[0].comment,
    };

    return { id, name, description, vehicle, review, value: totalValue };
  }

  public calculateTotalPrice(driverValue: number, distanceInMeters: number) {
    const distanceInKilometers = distanceInMeters / 1000;
    const totalValue = driverValue * distanceInKilometers;
    return totalValue;
  }

  public validateDriverMinDistance(driverMinDistance: number, rideDistance: number) {
    if (driverMinDistance > rideDistance) {
      throw new AppException(406, ErrorCode.INVALID_DISTANCE, ErrorMessages.INVALID_DISTANCE_DRIVER);
    }
  }

  public async createOne(data: CreateRideDto) {
    const driver = await driverService.findOne(data.driver.id);
    this.validateDriverMinDistance(driver.minDistanceInMeters, data.distance);

    return await Repository.createOne(data);
  }

  public async updateOne(id: number, data: UpdateRideDto) {
    if (data.driver && data.driver.id) {
      const driver = await driverService.findOne(data.driver.id);

      if (data.distance) {
        this.validateDriverMinDistance(driver.minDistanceInMeters, data.distance);
      }

    }

    const ride = await this.findOne(id);

    return await Repository.updateOne(ride.id, data);
  }

  public async deleteOne(id: number) {
    const ride = await this.findOne(id);

    return await Repository.deleteOne(ride.id);
  }
}

export default new Service();

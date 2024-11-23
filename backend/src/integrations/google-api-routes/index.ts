import axios from 'axios';
import AppException from '@errors/app-exception';
import errorMessages from '@errors/error-messages';
import { RouteRequest } from './compute-routes-body.interface';
import { ComputeRouteResponse } from './compute-routes-response.interface';

class GoogleApiRoutesIndex {
  public async computeRoutes(data: RouteRequest): Promise<ComputeRouteResponse> {
    const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

    if (!GOOGLE_API_KEY) throw new AppException(400, errorMessages.FORBIDDEN);

    const options = {
      method: 'POST',
      url: 'https://routes.googleapis.com/directions/v2:computeRoutes',
      headers:
      {
        'X-Goog-Fieldmask': '*',
        'X-Goog-Api-Key': GOOGLE_API_KEY,
        'Content-Type': 'application/json',
      },
      data,
      json: true,
    };

    try {
      const result = await axios(options);
      console.log('result: ', result.data.routes[0].distanceMeters);
      return result.data;
    } catch (error: any) {
      console.log('data: ', data);
      console.error(error.response.data);
      throw new AppException(400, errorMessages.INTEGRATION_ERROR);
    }
  }
}

export default new GoogleApiRoutesIndex();

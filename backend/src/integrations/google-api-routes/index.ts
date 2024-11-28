import axios from 'axios';
import AppException from '@errors/app-exception';
import errorMessages from '@errors/error-messages';
import { RouteRequest } from './compute-routes-body.interface';
import { ComputeRouteResponse } from './compute-routes-response.interface';
import { Coordinates } from './get-coordinates-response.interface';

class GoogleApiRoutesIndex {
  public async computeRoutes(data: RouteRequest): Promise<ComputeRouteResponse> {
    const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

    if (!GOOGLE_API_KEY) throw new AppException(400, 'forbidden', errorMessages.FORBIDDEN);

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
      return result.data;
    } catch (error: any) {
      console.log('data: ', data);
      console.error(error.response.data);
      throw new AppException(400, 'Erro na integração', errorMessages.INTEGRATION_ERROR);
    }
  }

  public async getCoordinates(address: string): Promise<Coordinates> {
    const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

    try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: address,
          key: GOOGLE_API_KEY,
        },
      });

      const { lat, lng } = response.data.results[0].geometry.location;
      return { lat, lng };
    } catch (error) {
      console.error('Erro ao buscar coordenadas:', error);
      throw new AppException(400, 'Erro na integração', errorMessages.INTEGRATION_ERROR);
    }
  }
}

export default new GoogleApiRoutesIndex();

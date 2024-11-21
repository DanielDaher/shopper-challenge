
import { z } from 'zod';
import { CreateRide } from './create-ride.dto';

export type UpdateRideDto = z.output<typeof UpdateRide>;
export const UpdateRide = CreateRide.partial();

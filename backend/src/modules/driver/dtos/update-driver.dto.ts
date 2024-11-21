
import { z } from 'zod';
import { CreateDriver } from './create-driver.dto';

export type UpdateDriverDto = z.output<typeof UpdateDriver>;
export const UpdateDriver = CreateDriver.partial();

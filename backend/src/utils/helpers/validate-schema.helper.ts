import appException from '@errors/app-exception';

import { z } from 'zod';
import { generateErrorMessage } from 'zod-error';
import { options } from '@config/zod-error';
import ErrorCode from '@errors/error-code';

class ValidateSchemaHelper {
  public validate(schema: z.ZodTypeAny, value: any) {
    const result = schema.safeParse(value);

    if (!result.success) {
      throw new appException(400, ErrorCode.INVALID_DATA, generateErrorMessage(result.error.issues, options));
    }
    return result.data;
  }
}

export default new ValidateSchemaHelper();

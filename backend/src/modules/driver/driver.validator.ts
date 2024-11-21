
import BaseValidator from '@abstracts/validator.abstract';
import { RequestHandler } from 'express';
import { CreateDriver } from './dtos/create-driver.dto';
import { UpdateDriver } from './dtos/update-driver.dto';

class Validator extends BaseValidator {
  public createOne: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, 'body', CreateDriver);
  };

  public updateOne: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, 'body', UpdateDriver);
  };
}

export default new Validator();

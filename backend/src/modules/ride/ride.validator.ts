
import BaseValidator from '@abstracts/validator.abstract';
import { RequestHandler } from 'express';
import { CreateRide } from './dtos/create-ride.dto';
import { UpdateRide } from './dtos/update-ride.dto';
import { EstimateRide } from './dtos/estimate-ride.dto';

class Validator extends BaseValidator {
  public createOne: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, 'body', CreateRide);
  };

  public updateOne: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, 'body', UpdateRide);
  };

  public estimateRide: RequestHandler = (req, res, next) => {
    this.validateSchema(req, next, 'body', EstimateRide);
  };
}

export default new Validator();

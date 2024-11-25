
import { Router } from 'express';

// import Auth from '@middlewares/auth.middleware';
import Controller from './ride.controller';
import Validator from './ride.validator';

const router = Router();

router
.route('/')
.get(
  Validator.queryParams,
  Controller.findAll,
)
.post(
  Validator.createOne,
  Controller.createOne,
);

router
.route('/estimate')
.post(
  Validator.estimateRide,
  Controller.estimateRide,
);

router
.route('/confirm')
.patch(
  Validator.createOne,
  Controller.createOne,
);

router
.route('/:customer_id')
.all(
  Validator.customerPathParams,
  Validator.queryParams,
)
.get(
  Controller.findRidesByCustomer,
);

export default router;

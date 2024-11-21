
import Service from './ride.service';
import { Request, Response } from 'express';
import { RequestQueryDto } from '@dtos/request-query.dto';

class Controller {
  public async findAll(req: Request, res: Response) {
    const { size, page, search } = req.query as RequestQueryDto;

    const result = (size && page)
      ? await Service.findAll(size, page, search)
      : await Service.findAllNoPagination(search);
    res.status(200).json(result);
  }

  public async findOne(req: Request, res: Response) {
    const result = await Service.findOne(+req.params.id);
    res.status(200).json(result);
  }

  public async findRidesByCustomer(req: Request, res: Response) {
    const { driver_id: driverId } = req.query as RequestQueryDto;
    const customerId = +req.params.customer_id;

    const result = await Service.findRidesByCustomer(customerId, driverId);
    res.status(200).json(result);
  }

  public async createOne(req: Request, res: Response) {
    const result = await Service.createOne(req.body);
    res.status(201).json(result);
  }

  public async updateOne(req: Request, res: Response) {
    const result = await Service.updateOne(+req.params.id, req.body);
    res.status(200).json(result);
  }

  public async deleteOne(req: Request, res: Response) {
    const result = await Service.deleteOne(+req.params.id);
    res.status(200).json(result);
  }
}

export default new Controller();

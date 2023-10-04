import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { handleError } from '../errors/handle.error';

export default class BookingController {
  constructor() {}

  public async creatABooking(req: Request, res: Response) {
    try {
      const userId = req.user?._id;

      if (req.query?.beauty_package) {
        if (!mongoose.Types.ObjectId.isValid(req.query?.beauty_package)) {
          res.status(404).json({ message: 'beauty package not found' });
        }
      }
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }
}

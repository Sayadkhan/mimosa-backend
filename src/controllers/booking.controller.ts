import { bookingType } from './../types/booking.type';
import { Request, Response } from 'express';
import mongoose, { Promise } from 'mongoose';
import { handleError } from '../errors/handle.error';
import BoookingModel from '../models/booking.model';
import BeautyPackageModel from '../models/beautyPackage.model';
import userModel from '../models/user.model';

export default class BookingController {
  constructor() {}

  public async creatABooking(req: Request, res: Response): Promise<void> {
    try {
      const { bid } = req.params;
      if (!mongoose.Types.ObjectId.isValid(bid)) {
        res.status(404).json({ message: 'beauty package not found' });
      }

      const user = await userModel.findById(req.user?._id).populate('bookings');

      const alReadyBooked = user?.bookings.find(
        (booking: bookingType) => bid === booking.beautyPackage._id.toString()
      );

      if (alReadyBooked) {
        res.status(403).json({ message: 'beauty packages already booked' });

        return;
      }

      await Promise.resolve().then(async () => {
        const booking = await BoookingModel.create({
          beautyPackage: bid,
          user: req.user?._id,
        });

        await BeautyPackageModel.findByIdAndUpdate(bid, {
          $addToSet: {
            bookings: booking._id,
          },
        });

        await userModel.findByIdAndUpdate(req.user?._id, {
          $addToSet: {
            bookings: booking._id,
          },
        });

        res.status(200).json(booking);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async beleteABookig(req: Request, res: Response): Promise<void> {
    try {
      const { bid } = req.params;
      if (!mongoose.Types.ObjectId.isValid(bid)) {
        res.status(404).json({ message: 'booking not found' });
      }

      const user = await userModel.findById(req.user?._id);

      const matchedBooking = user?.bookings.find(
        (booking: bookingType) => bid === booking._id.toString()
      );

      if (!matchedBooking) {
        res.status(403).json({ message: 'booking doesnt exits' });
      }

      await Promise.resolve().then(async () => {
        const booking = await BoookingModel.findByIdAndDelete(bid);

        res.status(200).json(booking);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async getAllBookings(req: Request, res: Response): Promise<void> {
    try {
      await Promise.resolve().then(async () => {
        const bookings = await BoookingModel.find({});

        res.status(200).json(bookings);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }
}

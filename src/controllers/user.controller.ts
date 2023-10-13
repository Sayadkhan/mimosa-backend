import { Request, Response } from 'express';
import mongoose from 'mongoose';
import userModel from '../models/user.model';
import { handleError } from '../errors/handle.error';

export default class UserController {
  constructor() {}

  public async getAnUser(req: Request, res: Response): Promise<void> {
    try {
      const { uid } = req.params;
      const userId = req.user?._id;

      if (!mongoose.Types.ObjectId.isValid(uid)) {
        res.status(404).json({ message: 'User not Found' });
      }

      if (uid !== userId.toString()) {
        res.status(403).json({ message: 'Forbidden' });
      }

      await Promise.resolve().then(async () => {
        const user = await userModel.findById(uid).populate('bookings');

        res.status(200).json(user);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }
  public async deletAnUser(req: Request, res: Response): Promise<void> {
    try {
      const { uid } = req.params;
      const userId = req.user?._id;

      if (!mongoose.Types.ObjectId.isValid(uid)) {
        res.status(404).json({ message: 'User not Found' });
      }

      if (uid !== userId.toString()) {
        res.status(403).json({ message: 'Forbidden' });
      }

      await Promise.resolve().then(async () => {
        const user = await userModel.findByIdAndDelete(uid);

        res.status(200).json(user);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }
  public async updateAnUser(req: Request, res: Response): Promise<void> {
    try {
      const { uid } = req.params;
      const userId = req.user?._id;
      const { name, photoUrl, address, phoneNumber } = req.body;

      if (!mongoose.Types.ObjectId.isValid(uid)) {
        res.status(404).json({ message: 'User not Found' });
      }

      if (uid !== userId.toString()) {
        res.status(403).json({ message: 'Forbidden' });
      }

      await Promise.resolve().then(async () => {
        const user = await userModel.findByIdAndUpdate(
          uid,
          {
            name,
            photoUrl,
            address,
            phoneNumber,
          },
          { new: true }
        );

        res.status(200).json(user);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }
  public async getallUser(req: Request, res: Response): Promise<void> {
    try {
      await Promise.resolve().then(async () => {
        const users = await userModel.find({});

        res.status(200).json(users);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }
}

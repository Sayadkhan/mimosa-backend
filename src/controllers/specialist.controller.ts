import { Request, Response } from 'express';
import { handleError } from '../errors/handle.error';

import mongoose from 'mongoose';
import SpecialistModel from '../models/specialist.model';

export default class SpecialistController {
  constructor() {}

  public async getAllSpecialists(req: Request, res: Response): Promise<void> {
    try {
      await Promise.resolve().then(async () => {
        const specialists = await SpecialistModel.find({});

        res.status(200).json(specialists);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async getASpecialist(req: Request, res: Response) {
    try {
      const { sid } = req.params;

      if (!mongoose.Types.ObjectId.isValid(sid)) {
        res.status(404).json({ message: 'specialists not found' });
      }

      await Promise.resolve().then(async () => {
        const specialists = await SpecialistModel.findById(sid);

        res.status(200).json(specialists);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async createASpecialist(req: Request, res: Response) {
    try {
      const { name, designation, bio, photoUrl, dateOfBirth } = req.body;

      await Promise.resolve().then(async () => {
        const specialists = await SpecialistModel.create(
          name,
          designation,
          bio,
          photoUrl,
          dateOfBirth
        );

        res.status(200).json(specialists);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async upadteASpecialist(req: Request, res: Response) {
    try {
      const { name, designation, bio, photoUrl, dateOfBirth } = req.body;

      const { sid } = req.params;

      if (!mongoose.Types.ObjectId.isValid(sid)) {
        res.status(404).json({ message: 'specialists not found' });
      }

      await Promise.resolve().then(async () => {
        const specialists = await SpecialistModel.findByIdAndUpdate(
          sid,
          {
            name,
            designation,
            bio,
            photoUrl,
            dateOfBirth,
          },
          {
            new: true,
          }
        );

        res.status(200).json(specialists);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async deletASpecialist(req: Request, res: Response) {
    try {
      const { sid } = req.params;

      if (!mongoose.Types.ObjectId.isValid(sid)) {
        res.status(404).json({ message: 'Specialist not found' });
      }

      await Promise.resolve().then(async () => {
        const specialist = await SpecialistModel.findByIdAndDelete(sid);

        res.status(200).json(specialist);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }
}

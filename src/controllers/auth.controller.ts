import { Request, Response } from 'express';
import userModel from '../models/user.model';
import JWTTokenManager from '../manager/jwt-token.manager';
import { handleError } from '../errors/handle.error';

const jwtInstance = new JWTTokenManager();

export default class AuthController {
  constructor() {}

  public async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password, photoUrl, address, phoneNumber } =
        req.body;

      await Promise.resolve().then(async () => {
        const user = await userModel.register(
          name,
          email,
          password,
          photoUrl,
          address,
          phoneNumber
        );

        const token = jwtInstance.createToken(user._id);

        res.status(200).json({ user, token });
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  // loging method
  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      await Promise.resolve().then(async () => {
        const user = await userModel.login(password, email);

        const token = jwtInstance.createToken(user._id);

        res.status(200).json({ user, token });
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }
}

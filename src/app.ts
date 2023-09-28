import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import hpp from 'hpp';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

class App {
  private app: Application;

  constructor() {
    this.app = express();

    this.configerMiddlewares();
    this.setupRoutes();
    this.connectToDatabase();
  }

  // mdilewars
  private configerMiddlewares(): void {
    this.app.use(express.json());
    //
    this.app.use(
      express.urlencoded({
        extended: true,
      })
    );
    // cors
    this.app.use(cors());
    // morgan
    this.app.use(morgan('dev'));
    // express mongo senizite
    this.app.use(mongoSanitize());
    // helmate
    this.app.use(helmet());
    // hpp
    this.app.use(hpp());
  }

  // routesetup
  private setupRoutes(): void {
    this.app.get('/', (req: Request, res: Response) => {
      res.status(200).json({ message: 'welcome to mimosa server' });
    });
  }
  // databaseconnect
  private connectToDatabase(): void {
    const URI = process.env.MONGO_URI as string;

    mongoose
      .connect(URI)
      .then(() => {
        const PORT = process.env.PORT || 4000;

        this.app.listen(PORT, () => {
          console.log(`server is running on Port: ${PORT}`);
        });
      })
      .catch((error) => {
        console.log(`mongobd connection error ${error}`);
      });
  }
}

dotenv.config();

new App();
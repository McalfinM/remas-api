import express, { Application, json, urlencoded } from "express";
import "reflect-metadata";
import { config as dotenv } from "dotenv";
import mongoose, { Mongoose } from "mongoose";
import RequestQueryValidation from './middlewares/requestQueryValidation';
import Subscribers from "./events/subscribers";
import { container } from "./inversify.config";
import { TYPES } from "./types";
import IRouter from "./api/routes/interfaces/router";
import i18next from "i18next";
import Backend from "i18next-fs-backend";
import { changeLang, trans } from "./middlewares/i18n";
import middlewarei18next from 'i18next-http-middleware'
import httpContext from 'express-http-context';
import cors from 'cors'

class App {
  public app: Application;
  private mongooseClient: Mongoose;

  constructor() {
    dotenv();
    this.app = express();
    this.mongooseClient = mongoose;
    this.applyMiddleware();
    this.routes();
    this.connectDB();
    // container.get<Subscribers>(TYPES.Subscribers)

    i18next
      .use(Backend)
      .use(middlewarei18next.LanguageDetector)
      .init({
        backend: {
          loadPath: __dirname + '/locales/{{lng}}/{{ns}}.json'
        },
        fallbackLng: 'id',
        preload: ['en', 'id']
      })
      .then((t) => { });
  }

  private connectDB(): void {
    console.log("Mongo connecting ...");
    this.mongooseClient
      .connect(process.env.MONGO_URI || "", {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Mongo connected.");
      })
      .catch((err) => {
        console.log("Mongo error.", err);
      });
  }

  protected applyMiddleware(): void {
    // middlewares here
    this.app.use(json());
    this.app.use(cors())
    this.app.use(urlencoded({ extended: true }));
    this.app.use(RequestQueryValidation.validatePage)
    this.app.use(RequestQueryValidation.validateLimit)
    this.app.use(middlewarei18next.handle(i18next, {}));
    this.app.use(httpContext.middleware)
    this.app.use(changeLang);
    this.app.use(trans)
  }

  protected routes() {

    this.app.use(container.get<IRouter>(TYPES.IndexRouter).router);
  }
}

const app = new App().app;

app.listen(process.env.PORT, () => {
  console.log("Run on port", process.env.PORT);
});

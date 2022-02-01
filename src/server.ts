import express, {Application, Request, Response, NextFunction} from 'express';
import cors from "cors";
import mongoose from "mongoose";
import router from './routes';
import routerApi from './routes/api';
import path from "path";
import fs = require('fs');
import {initDB} from "./utils/initDB";
import swaggerUi = require('swagger-ui-express');
import { getEnv } from "./enviroment";

export const HTML_FILE = path.join(__dirname, 'pages');

class Server {
  public app: Application;

  /* Arrancan archivos Swagger */
  private swaggerFile: any = path.join(__dirname, 'swagger', 'swagger.json'); //(process.cwd()+"\\swagger\\swagger.json");
  private swaggerData: any = fs.readFileSync(this.swaggerFile, 'utf8');
  // private customCss: any = fs.readFileSync((process.cwd()+"\\swagger\\swagger.css"), 'utf8');
  private customCss: any = fs.readFileSync(path.join(__dirname, 'swagger', 'swagger.css'), 'utf8');
  private swaggerDocument = JSON.parse(this.swaggerData);

  constructor() {
    this.app = express();
    this.config();
  }

  private config(): void {
    getEnv();

    const {MONGO_URI} = process.env;

    mongoose.connect(MONGO_URI || '');
    const db = mongoose.connection;

    db.on('error', function(err){
      console.log('connection error', err)
    });

    db.once('open', function(){
      console.log('Connection to DB successful');
      new initDB();
    });

    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.static(HTML_FILE));
    this.app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(this.swaggerDocument, undefined, undefined, this.customCss));
    this.app.use('/api', routerApi);
  }
}

export default new Server().app;
//External
import express from 'express';
import * as morgan from "morgan";
import * as cors from "cors";
import * as listEndpoints from "express-list-endpoints";
//Config for .dotenv
import * as dotenv from "dotenv";
import 'dotenv/config';
//Env vars
const API_LOCAL_BASE_URL = process.env.API_LOCAL_BASE_URL;
const APP_PORT = process.env.APP_FIRST_PORT || process.env.APP_SECOND_PORT;
const API_AUTH_NAME_URL = process.env.API_AUTH_NAME_URL;
//Config router
import { authRouter } from "../routes/auth-routes";

/**
 * @description initial settings for cors, express, etc (Middleware)
 * @returns an express object with the initial settings
 */
export const appMiddleware = () => {
  try {
    // Initialize the express engine
    const app = express();

     //Using morgan-middleware
     app.use(morgan('dev'));

     //-- start cors --
    //Set cors
    var corsOptions = {
      origin: `${API_LOCAL_BASE_URL}:${APP_PORT}`,
    };
    //Use cors options
    app.use(cors(corsOptions));
    //-- end cors --

    //-- start config for data api --
    //Use express with json format
    app.use(express.json());

    //Only fort strict format configured
    app.use(express.urlencoded({ extended: true }));
    //-- end config for data api --


    //-- start with routes --
    app.use(API_AUTH_NAME_URL, authRouter);
    //-- end with routes --

    
    //-- See all endpoints    
    console.log(listEndpoints(app));
   
    return app;

  } catch (error) {
    console.log(`Error in appMiddleware() function. Caused by ${error}`);
  }
};

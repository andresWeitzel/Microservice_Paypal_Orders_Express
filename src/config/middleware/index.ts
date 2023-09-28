//External
import express from "express";
import morgan from "morgan";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
//Config for .dotenv
import 'dotenv/config';
//Env vars
const API_LOCAL_BASE_URL:string = process.env.API_LOCAL_BASE_URL || '';
const APP_PORT:string = process.env.APP_FIRST_PORT || process.env.APP_SECOND_PORT || '';
const API_AUTH_NAME_URL:string = process.env?.API_AUTH_NAME_URL || '';
const API_ORDER_NAME_URL:string = process.env?.API_ORDER_NAME_URL || '';
const API_LOCAL_BASE_ENDPOINT:string = `${API_LOCAL_BASE_URL}:${APP_PORT}` || '';
//Routes
import { authRouter } from "../routes/auth-routes";
import { ordersRouter } from "../routes/orders-routes";

/**
 * @description initial settings for cors, express, etc (Middleware)
 * @returns an express object with the initial settings
 */
export const appMiddleware = async() => {
  try {
    // Initialize the express engine
    const app = express();

     //Using morgan-middleware
     app.use(morgan('dev'));

     //-- start cors --
    //Set cors
    var corsOptions = {
      origin: API_LOCAL_BASE_ENDPOINT,
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
    app.use(API_ORDER_NAME_URL, ordersRouter);
    //-- end with routes --

    
    //-- See all endpoints    
    console.log(listEndpoints(app));
   
    return app;

  } catch (error) {
    console.log(`Error in appMiddleware() function. Caused by ${error}`);
  }
};

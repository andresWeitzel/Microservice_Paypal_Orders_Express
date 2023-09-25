//External
//Config for .dotenv
import * as dotenv from "dotenv";
import 'dotenv/config';
import * as express from 'express';
//Environment vars
const APP_PORT = process.env.APP_FIRST_PORT || process.env.APP_SECOND_PORT;
//Config middleware
import {appMiddleware} from "./config/middleware";

/**
 * @description function in charge of starting the server, adding the initial configuration and setting the http routes
 * @returns active instance of the server for handling requests and responses
 */
const run = () => {
  try {
    //Middleware
    const app:any = appMiddleware();
    console.log(app);

    //Server
     app.listen(APP_PORT, () => {
      console.log(`Server is running on port ${APP_PORT}`);
    });
  } catch (error) {
    const msg = `Error in run() function, server.js file. Caused by ${error}`;
    console.log(msg);
  }
};

run();
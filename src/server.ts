//External
//Config for .dotenv
import * as dotenv from "dotenv";
import "dotenv/config";
import express from "express";
//Environment vars
const APP_PORT = process.env.APP_FIRST_PORT || process.env.APP_SECOND_PORT;
//Config middleware
import { appMiddleware } from "./config/middleware";
//Const-vars
let msgResponse: string;
let msgLog: string; 

/**
 * @description function in charge of starting the server, adding the initial configuration and setting the http routes
 * @returns active instance of the server for handling requests and responses
 */
const run = async () => {
  try {
    //Middleware
    const app: any = await appMiddleware();

    //Server
    app.listen(APP_PORT, () => {
      console.log(`Server is running on port ${APP_PORT}`);
    });
  } catch (error) {
    msgResponse = "ERROR in run() function.";
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
  }
};

run();

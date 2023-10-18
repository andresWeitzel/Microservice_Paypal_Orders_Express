//External
import { Request, Response } from "express";
//Const-vars
let eventHeaders: any;
let encripted: any;
let user: any;
let password: any;
let credentials: Object | any;
let msgResponse: string;
let msgLog: string;

export const decoding = async (req: Request) => {
  try {
    eventHeaders = req.headers;

    encripted = Buffer.from(
      eventHeaders.authorization.split(" ")[1],
      "base64"
    ).toString();
    user = encripted.split(":")[0];
    password = encripted.split(":")[1];
    credentials = {
      user: user,
      password: password
    };
    return credentials;
  
  } catch (error) {
    msgResponse = "ERROR in decoding() function.";
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return null;
  }
};

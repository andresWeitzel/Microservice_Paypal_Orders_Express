//External
import { Request, Response } from "express";
//Const-vars
let eventHeaders: any;
let encripted: any;
let user: any;
let password: any;
let credentials: Object | any;

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
  } catch (error) {
    console.error(`ERROR in function decoding(). Caused by ${error} .`);
    credentials=null;
  }
  return credentials;
};

//External
import { Request, Response } from "express";
//Const-vars
let eventHeaders: any;
let encripted: any;
let user: any;
let password: any;

export const decoding = async (req: Request) => {
  try {
    eventHeaders = req.headers;

    encripted = Buffer.from(
      eventHeaders.authorization.split(" ")[1],
      "base64"
    ).toString();
    user = encripted.split(":")[0];
    password = encripted.split(":")[1];

    console.log({ USER: user });
    console.log({ PASSWORD: password });
  } catch (error) {
    console.error(`ERROR in function decoding(). Caused by ${error} .`);
  }

  return user + password;
};

//External
import { Request } from "express";
const axios = require("axios");
//Const-vars
let reqBody: any;
let reqHeaders: any;
let config:any;
let axiosResponse: any;
let orderCreated: any;

export const createOrderFromPaypal = async (req: Request) => {
  try {
    reqHeaders = req.headers;
    reqBody = req.body;

    config={
      headers:{
        "Content-Type": "application/json",
        "PayPal-Request-Id": reqHeaders?.paypalRequestId,
        "Authorization": reqHeaders?.authorization
      }
    }
    axiosResponse = await axios.post(reqBody.url, reqBody, config);
    orderCreated = axiosResponse.data;
  } catch (error) {
    console.error(
      `ERROR in function createOrderFromPaypal(). Caused by ${error} .`
    );
    orderCreated = null;
  }
  return orderCreated;
};

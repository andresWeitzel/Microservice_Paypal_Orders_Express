//External
import { Request } from "express";
const axios = require("axios");
//Const-vars
let reqBody: any;
let reqHeaders:any;
let headers:any;
let axiosResponse: any;
let orderCreated: any;

export const createOrderFromPaypal = async (req: Request) => {
  try {
    reqHeaders = req.headers;
      headers= {
        'Content-Type': 'application/json',
        'PayPal-Request-Id': reqHeaders?.paypalRequestId,
        'Authorization': reqHeaders?.authorization
    }
    reqBody = req.body;
    axiosResponse = await axios.post(
      reqBody.url,
      reqBody,
      reqHeaders
      
    );
    orderCreated = axiosResponse.data;
  } catch (error) {
    console.error(`ERROR in function createOrderFromPaypal(). Caused by ${error} .`);
    orderCreated=null;
  }
  return orderCreated;
};
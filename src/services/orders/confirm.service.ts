//External
import { Request } from "express";
import "dotenv/config";
//Helpers
import { sendPostRequest } from "../../helpers/axios/request/post";
//Const
//paypal base
const API_PAYPAL_BASE_URL: string = process.env.API_PAYPAL_BASE_URL || "";
//paypal confirm order
const API_PAYPAL_CONFIRM_ORDER_RESOURCE: string =
  process.env.API_PAYPAL_CONFIRM_ORDER_RESOURCE || "";
const API_PAYPAL_CONFIRM_ORDER_RESOURCE_EXTENSION:string = process.env.API_PAYPAL_CONFIRM_ORDER_RESOURCE_EXTENSION || "";  
//vars
let reqBody: any;
let reqHeaders: any;
let reqParams:any
let axiosData: any;
let axiosConfig: any;
let orderCreated: any;
let msgResponse: string;
let msgLog: string;

/**
 * @description Function to send a axios post request for create an order from paypal api
 * @param {any} req any type
 * @returns  an object with order information from paypal api
 * @example
 */
export const confirmOrderFromPaypal = async (req: Request) => {
  try {
    reqHeaders = req.headers;
    reqBody = req.body;
    reqParams = req.params;
    orderCreated = null;

    const API_PAYPAL_CONFIRM_ORDER_URL: string =
    `${API_PAYPAL_BASE_URL}${API_PAYPAL_CONFIRM_ORDER_RESOURCE}${reqParams.id}${API_PAYPAL_CONFIRM_ORDER_RESOURCE_EXTENSION}` ||
    "";

    axiosData = reqBody;

    axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        //"PayPal-Request-Id": reqHeaders?.paypalRequestId,
        Authorization: reqHeaders?.authorization
      }
    };

    orderCreated = await sendPostRequest(
        API_PAYPAL_CONFIRM_ORDER_URL,
      axiosData,
      axiosConfig
    );

    return orderCreated;
  } catch (error) {
    msgResponse = "ERROR in confirmOrderFromPaypal() function.";
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return null;
  }
};

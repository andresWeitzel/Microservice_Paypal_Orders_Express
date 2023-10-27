//External
import { Request } from "express";
import "dotenv/config";
//Helpers
import { sendPostRequest } from "../../helpers/axios/request/post";
//Const
//paypal base
const API_PAYPAL_BASE_URL: string = process.env.API_PAYPAL_BASE_URL || "";
//paypal create order
const API_PAYPAL_CREATE_ORDER_RESOURCE: string =
  process.env.API_PAYPAL_CREATE_ORDER_RESOURCE || "";
const API_PAYPAL_CREATE_ORDER_URL: string =
  `${API_PAYPAL_BASE_URL}:${API_PAYPAL_CREATE_ORDER_RESOURCE}` || "";
//vars
let reqBody: any;
let reqHeaders: any;
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
export const createOrderFromPaypal = async (req: Request) => {
  try {
    reqHeaders = req.headers;
    reqBody = req.body;
    orderCreated = null;

    axiosData = reqBody;

    axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "PayPal-Request-Id": reqHeaders?.paypalRequestId,
        Authorization: reqHeaders?.authorization
      }
    };

    orderCreated = await sendPostRequest(
      API_PAYPAL_CREATE_ORDER_URL,
      axiosData,
      axiosConfig
    );

    return orderCreated;
  } catch (error) {
    msgResponse = "ERROR in createOrderFromPaypal() function.";
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return null;
  }
};

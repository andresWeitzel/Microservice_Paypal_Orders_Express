//External
import { Request } from "express";
import "dotenv/config";
//Helpers
import { sendPostRequest } from "../../helpers/axios/request/post";
//Const
//paypal base
const API_PAYPAL_BASE_URL: string = process.env.API_PAYPAL_BASE_URL || "";
//paypal update order
const API_PAYPAL_UPDATE_ORDER_RESOURCE: string =
  process.env.API_PAYPAL_UPDATE_ORDER_RESOURCE || "";
//Vars
let reqBody: any;
let reqHeaders: any;
let reqParams: any;
let axiosConfig: any;
let axiosData: any;
let orderUpdated: any;
let msgResponse: string;
let msgLog: string;

/**
 * @description Function to send a axios get request for update an order from paypal api
 * @param {any} req any type
 * @returns  an object with order information from paypal api
 * @example
 */
export const updateOrderFromPaypal = async (req: Request) => {
  try {
    reqHeaders = req.headers;
    reqBody = req.body;
    reqParams = req.params;
    orderUpdated = null;

    const API_PAYPAL_UPDATE_ORDER_URL: string =
      `${API_PAYPAL_BASE_URL}${API_PAYPAL_UPDATE_ORDER_RESOURCE}${reqParams.id}` ||
      "";

    axiosData = reqBody;

    axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "PayPal-Request-Id": reqHeaders?.paypalRequestId,
        Authorization: reqHeaders?.authorization,
      },
    };

    orderUpdated = await sendPostRequest(
      API_PAYPAL_UPDATE_ORDER_URL,
      axiosData,
      axiosConfig
    );

    return orderUpdated;
  } catch (error) {
    msgResponse = "ERROR in updateOrderFromPaypal() function.";
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return null;
  }
};

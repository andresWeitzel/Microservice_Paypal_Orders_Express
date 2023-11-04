//External
import { Request } from "express";
import "dotenv/config";
//Helper
import { sendGetRequest } from "../../helpers/axios/request/get";
//Const
//paypal base
const API_PAYPAL_BASE_URL: string = process.env.API_PAYPAL_BASE_URL || "";
//paypal get order
const API_PAYPAL_ORDERS_BASE_URL: string =
  process.env.API_PAYPAL_ORDERS_BASE_URL || "";
//vars
let reqHeaders: any;
let reqParams: any;
let axiosConfig: any;
let axiosData: any;
let orderData: any;
let msgResponse: string;
let msgLog: string;

/**
 * @description Function to send a axios get request for get an order from paypal api
 * @param {any} req any type
 * @returns  an object with order information from paypal api
 * @example
 */
export const getOrderFromPaypal = async (req: Request) => {
  try {
    reqHeaders = req.headers;
    reqParams = req.params;
    orderData = null;

    const API_PAYPAL_GET_ORDER_URL: string =
      `${API_PAYPAL_BASE_URL}${API_PAYPAL_ORDERS_BASE_URL}${reqParams.id}` ||
      "";

    axiosData = null;

    axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "PayPal-Request-Id": reqHeaders?.paypalRequestId,
        Authorization: reqHeaders?.authorization,
      },
    };

    orderData = await sendGetRequest(
      API_PAYPAL_GET_ORDER_URL,
      axiosData,
      axiosConfig
    );

    return orderData;
  } catch (error) {
    msgResponse = "ERROR in getOrderFromPaypal() function.";
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return null;
  }
};

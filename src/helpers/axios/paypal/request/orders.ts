//External
import { Request } from "express";
const axios = require("axios");
//Config for .dotenv
import 'dotenv/config';
//Const-vars
const API_PAYPAL_CREATE_ORDER_URL:string = `${process.env.API_PAYPAL_BASE_URL}:${process.env.API_PAYPAL_CREATE_ORDER_RESOURCE}` || '';
let reqBody: any;
let reqHeaders: any;
let reqParams: any;
let config:any;
let axiosResponse: any;
let orderCreated: any;
let orderData: any;
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
    axiosResponse = null;

    config={
      headers:{
        "Content-Type": "application/json",
        "PayPal-Request-Id": reqHeaders?.paypalRequestId,
        "Authorization": reqHeaders?.authorization
      }
    }
    axiosResponse = await axios.post(API_PAYPAL_CREATE_ORDER_URL, reqBody, config);

    orderCreated = axiosResponse.data;
    
  return orderCreated;
  
  } catch (error) {
    msgResponse = "ERROR in createOrderFromPaypal() function.";
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return null;
  }
};

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
    axiosResponse = null;

    const API_PAYPAL_GET_ORDER_URL:string = `${process.env.API_PAYPAL_BASE_URL}${process.env.API_PAYPAL_GET_ORDER_RESOURCE}/${reqParams.id}` || '';
    console.log(API_PAYPAL_GET_ORDER_URL);


    config={
      headers:{
        "Content-Type": "application/json",
        "PayPal-Request-Id": reqHeaders?.paypalRequestId,
        "Authorization": reqHeaders?.authorization
      }
    }
    axiosResponse = await axios.get(API_PAYPAL_GET_ORDER_URL, config);

    orderData = axiosResponse.data;

  return orderData;

  } catch (error) {
    msgResponse = "ERROR in getOrderFromPaypal() function.";
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return null;
  }
};



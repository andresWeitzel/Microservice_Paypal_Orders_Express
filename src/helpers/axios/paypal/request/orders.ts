//External
import { Request } from "express";
const axios = require("axios");
//Config for .dotenv
import 'dotenv/config';
//Const-vars
const API_PAYPAL_CREATE_ORDER_URL:string = `${process.env.API_PAYPAL_BASE_URL}:${process.env.API_PAYPAL_CREATE_ORDER_RESOURCE}` || '';
let reqBody: any;
let reqHeaders: any;
let config:any;
let axiosResponse: any;
let orderCreated: any;


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

    config={
      headers:{
        "Content-Type": "application/json",
        "PayPal-Request-Id": reqHeaders?.paypalRequestId,
        "Authorization": reqHeaders?.authorization
      }
    }
    axiosResponse = await axios.post(API_PAYPAL_CREATE_ORDER_URL, reqBody, config);
    orderCreated = axiosResponse.data;
  } catch (error) {
    console.error(
      `ERROR in function createOrderFromPaypal(). Caused by ${error} .`
    );
    orderCreated = null;
  }
  return orderCreated;
};

// /**
//  * @description Function to send a axios get request for get an order from paypal api
//  * @param {any} req any type
//  * @returns  an object with order information from paypal api
//  * @example
//  */
// export const getOrderFromPaypal = async (req: Request) => {
//   try {

//     reqHeaders = req.headers;
//     reqBody = req.body;

//     const API_PAYPAL_GET_ORDER_URL:string = `${process.env.API_PAYPAL_BASE_URL}:${process.env.API_PAYPAL_GET_ORDER_URL}/${reqHeaders.id}` || '';


//     config={
//       headers:{
//         "Content-Type": "application/json",
//         "PayPal-Request-Id": reqHeaders?.paypalRequestId,
//         "Authorization": reqHeaders?.authorization
//       }
//     }
//     axiosResponse = await axios.post(API_PAYPAL_GET_ORDER_URL, reqBody, config);
//     orderCreated = axiosResponse.data;
//   } catch (error) {
//     console.error(
//       `ERROR in function createOrderFromPaypal(). Caused by ${error} .`
//     );
//     orderCreated = null;
//   }
//   return orderCreated;
// };



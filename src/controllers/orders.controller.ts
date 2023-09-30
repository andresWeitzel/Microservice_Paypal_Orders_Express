//External
import { Request, Response } from "express";
import "dotenv/config";
//Enums
import { statusCode } from "../enum/http/status-code";
//Helpers
import { validateHeadersAndKeys } from "../helpers/validations/headers/validateHeadersAndKeys";
import { createOrderFromPaypal } from "../helpers/axios/paypal/request/orders";
//Const-vars
const statusCodeInternalServerError = statusCode.INTERNAL_SERVER_ERROR;
const statusCodeBadRequest = statusCode.BAD_REQUEST;
const statusCodeOk = statusCode.OK;
let orderData:any;
let eventHeaders: any;
let checkEventHeadersAndKeys: any;

/**
 * @description Controller to create a order from paypal api
 * @param {any} req any type
 * @param {any} res any type
 * @returns  an object with order information from paypal api
 * @example
 */
export const createOrderController = async (req: Request, res: Response) => {
    try {
      //-- start with validation headers and keys  ---
      eventHeaders = req.headers;
  
      checkEventHeadersAndKeys = await validateHeadersAndKeys(eventHeaders);
  
      if (checkEventHeadersAndKeys != (null || "")) {
        return res
          .status(statusCodeBadRequest)
          .send({ error: checkEventHeadersAndKeys });
      }
      //-- end with validation headers and keys  ---
  
      //-- start with axios order operation  ---
      orderData = await createOrderFromPaypal(req);
      //-- end with axios order operation  ---
    } catch (error) {
      console.log(`Error in createOrderController controller. Caused by ${error}`);
      orderData = error;
    }
    switch (orderData) {
      case null:
        return res
          .status(statusCodeInternalServerError)
          .send({ error: orderData });
      case orderData != null:
        return res.status(statusCodeOk).send(orderData);
      default:
        return res.status(statusCodeOk).send(orderData);
    }
  };


// /**
//  * @description Controller to get a order from paypal api
//  * @param {any} req any type
//  * @param {any} res any type
//  * @returns  an object with order information from paypal apiapi
//  * @example
//  */
// export const getOrderController = async (req: Request, res: Response) => {
//   try {
//     //-- start with validation headers and keys  ---
//     eventHeaders = req.headers;

//     checkEventHeadersAndKeys = await validateHeadersAndKeys(eventHeaders);

//     if (checkEventHeadersAndKeys != (null || "")) {
//       return res
//         .status(statusCodeBadRequest)
//         .send({ error: checkEventHeadersAndKeys });
//     }
//     //-- end with validation headers and keys  ---

//     //-- start with axios order operation  ---
//     orderData = await createOrderFromPaypal(req);
//     //-- end with axios order operation  ---
//   } catch (error) {
//     console.log(`Error in createOrderController controller. Caused by ${error}`);
//     orderData = error;
//   }
//   switch (orderData) {
//     case null:
//       return res
//         .status(statusCodeInternalServerError)
//         .send({ error: orderData });
//     case orderData != null:
//       return res.status(statusCodeOk).send(orderData);
//     default:
//       return res.status(statusCodeOk).send(orderData);
//   }
// };  
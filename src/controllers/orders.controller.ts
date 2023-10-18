//External
import { Request, Response } from "express";
import "dotenv/config";
//Enums
import { statusCode } from "../enum/http/status-code";
//Helpers
import { validateHeadersAndKeys } from "../helpers/validations/headers/validateHeadersAndKeys";
import { createOrderFromPaypal, getOrderFromPaypal, updateOrderFromPaypal } from "../helpers/axios/paypal/request/orders";
//Const-vars
const statusCodeInternalServerError = statusCode.INTERNAL_SERVER_ERROR;
const statusCodeBadRequest = statusCode.BAD_REQUEST;
const statusCodeOk = statusCode.OK;
let orderData: any;
let eventHeaders: any;
let checkEventHeadersAndKeys: any;
let msgResponse: string;
let msgLog: string;

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
    switch (orderData) {
      case null:
        return res
          .status(statusCodeInternalServerError)
          .send({ error: "Could not create a order. Check the credentials" });
      case orderData != null:
        return res.status(statusCodeOk).send(orderData);
      default:
        return res.status(statusCodeOk).send(orderData);
    }
  } catch (error) {
    msgResponse = "ERROR in createOrderController() function controller.";
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return res
      .status(statusCodeInternalServerError)
      .send({ error: msgResponse });
  }
};

/**
 * @description Controller to get a order from paypal api
 * @param {any} req any type
 * @param {any} res any type
 * @returns  an object with order information from paypal apiapi
 * @example
 */
export const getOrderController = async (req: Request, res: Response) => {
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
    orderData = await getOrderFromPaypal(req);
    //-- end with axios order operation  ---

    switch (orderData) {
      case null:
        return res
          .status(statusCodeInternalServerError)
          .send({ error: "Could not get a order. Check the credentials or id of the order" });
      case orderData != null:
        return res.status(statusCodeOk).send(orderData);
      default:
        return res.status(statusCodeOk).send(orderData);
    }
  } catch (error) {
    msgResponse = "ERROR in getOrderController() function controller.";
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return res
      .status(statusCodeInternalServerError)
      .send({ error: msgResponse });
  }

};


/**
 * @description Controller to update a order from paypal api
 * @param {any} req any type
 * @param {any} res any type
 * @returns  an object with order information from paypal apiapi
 * @example
 */
export const updateOrderController = async (req: Request, res: Response) => {
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
    orderData = await updateOrderFromPaypal(req);
    //-- end with axios order operation  ---

    switch (orderData) {
      case null:
        return res
          .status(statusCodeInternalServerError)
          .send({ error: "Could not update a order. Check the credentials or id of the order" });
      case orderData != null:
        return res.status(statusCodeOk).send(orderData);
      default:
        return res.status(statusCodeOk).send(orderData);
    }
  } catch (error) {
    msgResponse = "ERROR in updateOrderController() function controller.";
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return res
      .status(statusCodeInternalServerError)
      .send({ error: msgResponse });
  }

};

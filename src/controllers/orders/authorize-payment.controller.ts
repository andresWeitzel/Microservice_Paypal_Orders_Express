//External
import { Request, Response } from "express";
import "dotenv/config";
//Enums
import { statusCode } from "../../enum/http/status-code";
//Helpers
import { validateHeadersAndKeys } from "../../helpers/validations/headers/validateHeadersAndKeys";
//services
import { authorizePaymentFromPaypal } from "../../services/orders/authorize-payment.service";
//const
const statusCodeInternalServerError = statusCode.INTERNAL_SERVER_ERROR;
const statusCodeBadRequest = statusCode.BAD_REQUEST;
const statusCodeOk = statusCode.OK;
//vars
let orderData: any;
let eventHeaders: any;
let checkEventHeadersAndKeys: any;
let msgResponse: string;
let msgLog: string;

/**
 * @description Controller to authorize a payment for an order from paypal api
 * @param {any} req any type
 * @param {any} res any type
 * @returns  an object with order information from paypal api
 * @example
 */
export const authorizePaymentOrderController = async (req: Request, res: Response) => {
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
    orderData = await authorizePaymentFromPaypal(req);
    //-- end with axios order operation  ---
    switch (orderData) {
      case null:
        return res
          .status(statusCodeInternalServerError)
          .send({ error: "Could not authorize a payment for an order. Check the credentials" });
      case orderData != null:
        return res.status(statusCodeOk).send(orderData);
      default:
        return res.status(statusCodeOk).send(orderData);
    }
  } catch (error) {
    msgResponse = "ERROR in authorizePaymentOrderController() function controller.";
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return res
      .status(statusCodeInternalServerError)
      .send({ error: msgResponse });
  }
};

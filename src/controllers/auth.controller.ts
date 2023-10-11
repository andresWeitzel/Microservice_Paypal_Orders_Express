//External
import { Request, Response } from "express";
import "dotenv/config";
//Enums
import { statusCode } from "../enum/http/status-code";
//Helpers
import { validateHeadersAndKeys } from "../helpers/validations/headers/validateHeadersAndKeys";
import { decoding } from "../helpers/cryptography/http/headers/authorization";
import { getAccessTokenFromPaypal } from "../helpers/axios/paypal/request/auth";
//Const-vars
const statusCodeInternalServerError = statusCode.INTERNAL_SERVER_ERROR;
const statusCodeBadRequest = statusCode.BAD_REQUEST;
const statusCodeOk = statusCode.OK;
let tokenData: any;
let eventHeaders: any;
let checkEventHeadersAndKeys: any;
let credentials: Object | any;
let msgResponse:string;
let msgLog:string;

/**
 * @description Controller to get an access token from paypal api
 * @param {any} req any type
 * @param {any} res any type
 * @returns  an object with the token and information from paypal api
 * @example
 */
export const getAccessTokenController = async (req: Request, res: Response) => {
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

    credentials = await decoding(req);

    if (credentials == (null || undefined || "")) {
      return res
        .status(statusCodeBadRequest)
        .send({ error: "Could not obtain username and password credentials" });
    }

    //-- start with axios token operation  ---
    tokenData = await getAccessTokenFromPaypal(credentials);
    //-- end with axios token operation  ---

    switch (tokenData) {
      case null:
        return res
          .status(statusCodeInternalServerError)
          .send({ error: "Could not obtain a token. Check the credentials" });
      case tokenData != null:
        return res.status(statusCodeOk).send(tokenData);
      default:
        return res.status(statusCodeOk).send(tokenData);
    }

  } catch (error) {
    msgResponse = 'ERROR in getAccessToken() function controller.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return res.status(statusCodeInternalServerError).send({error : msgResponse});
  }

};

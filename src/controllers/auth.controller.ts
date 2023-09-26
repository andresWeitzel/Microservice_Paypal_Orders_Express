//External
import { Request, Response } from "express";
import "dotenv/config";
const axios = require("axios");
//Enums
import { statusCode } from "../enum/http/status-code";
//Helpers
import { validateHeadersAndKeys } from "../helpers/validations/headers/validateHeadersAndKeys";
import { decoding } from "../helpers/cryptography/authorization";
//Const-vars
const statusCodeInternalServerError = statusCode.INTERNAL_SERVER_ERROR;
const statusCodeBadRequest = statusCode.BAD_REQUEST;
const statusCodeOk = statusCode.OK;
let tokenData: any;
let axiosResponse: any;
let reqBody: any;
let eventHeaders: any;
let checkEventHeadersAndKeys: any;

/**
 * @description Controlle to get an access token from paypal api
 * @param {any} req any type
 * @param {any} res any type
 * @returns  an object with the token and information from paypal api
 * @example
 */
export const getAccessToken = async (req: Request, res: Response) => {
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

  await decoding(req);


    //-- start with axios token operation  ---
    reqBody = req.body;
    axiosResponse = await axios.post(
      reqBody.url,
      new URLSearchParams({
        grant_type: "client_credentials"
      }),
      {
        auth: {
          username: reqBody.apiPaypalClientValue,
          password: reqBody.apiPaypalSecretKeyValue
        }
      }
    );
    tokenData = axiosResponse.data;
    //-- end with axios token operation  ---
  } catch (error) {
    console.log(`Error in getAccessToken controller. Caused by ${error}`);
    tokenData = error;
  }
  switch (tokenData) {
    case null:
      return res.status(statusCodeInternalServerError).send({ error: tokenData });
    case tokenData != null:
      return res.status(statusCodeOk).send(tokenData);
    default:
      return res.status(statusCodeOk).send(tokenData);
  }
};

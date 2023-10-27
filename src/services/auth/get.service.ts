//External
const axios = require("axios");
import "dotenv/config";
//Helpers
import { sendPostRequest } from "../../helpers/axios/request/post";
//Const-vars
const API_PAYPAL_CREATE_TOKEN_URL: string =
  `${process.env.API_PAYPAL_BASE_URL}:${process.env.API_PAYPAL_CREATE_TOKEN_RESOURCE}` ||
  "";
let axiosResponse: any;
let axiosData: any;
let axiosConfig: any;
let msgResponse: string;
let msgLog: string;

/**
 * @description Function to send a axios post request for get a token from paypal api
 * @param {any} credentials any type
 * @returns  an object with token information from paypal api
 * @example
 */
export const getAccessTokenFromPaypal = async (credentials: any) => {
  try {
    axiosData = new URLSearchParams({
      grant_type: "client_credentials",
    });

    axiosConfig = {
      auth: {
        username: credentials.user,
        password: credentials.password,
      },
    };

    axiosResponse = await sendPostRequest(
      API_PAYPAL_CREATE_TOKEN_URL,
      axiosData,
      axiosConfig
    );

    return axiosResponse;
  } catch (error) {
    msgResponse = "ERROR in getAccessTokenFromPaypal() function controller.";
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return null;
  }
};

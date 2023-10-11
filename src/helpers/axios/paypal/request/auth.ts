//External
const axios = require("axios");
//Config for .dotenv
import "dotenv/config";
//Const-vars
let axiosResponse: any;
let tokenData: any;
const API_PAYPAL_CREATE_TOKEN_URL: string =
  `${process.env.API_PAYPAL_BASE_URL}:${process.env
    .API_PAYPAL_CREATE_TOKEN_RESOURCE}` || "";
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
    axiosResponse = await axios.post(
      API_PAYPAL_CREATE_TOKEN_URL,
      new URLSearchParams({
        grant_type: "client_credentials"
      }),
      {
        auth: {
          username: credentials.user,
          password: credentials.password
        }
      }
    );
    tokenData = axiosResponse.data;

    return tokenData;
  } catch (error) {
    msgResponse = "ERROR in getAccessTokenFromPaypal() function controller.";
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return null;
  }
};

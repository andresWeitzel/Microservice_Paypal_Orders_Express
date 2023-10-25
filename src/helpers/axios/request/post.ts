const axios = require("axios");
//Const-vars
let axiosResponse: any;
let tokenData: any;
let msgResponse: string;
let msgLog: string;

/**
 * @description Function to send a axios post request
 * @param {string} url string type
 * @param {any} data any type
 * @param {any} config any type
 * @returns  an object with the information from request
 * @example
 */
export const sendPostRequest = async (url: string, data: any, config: any) => {
  try {
    axiosResponse = await axios.post(url, data, config);

    tokenData = axiosResponse != null ? axiosResponse.data : null;

    return tokenData;
  } catch (error) {
    msgResponse = "ERROR in sendPostRequest() helper function.";
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return null;
  }
};

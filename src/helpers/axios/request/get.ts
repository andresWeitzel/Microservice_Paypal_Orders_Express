const axios = require("axios");
//Const-vars
let axiosResponse: any;
let axiosData: any;
let msgResponse: string;
let msgLog: string;

/**
 * @description Function to send a axios get request
 * @param {string} url string type
 * @param {any} data any type
 * @param {any} config any type
 * @returns  an object with the information from request
 * @example
 */
export const sendGetRequest = async (url: string, data: any, config: any) => {
  try {
    if (data == (null || undefined) && config == (null || undefined)) {
      axiosResponse = await axios.get(url);
    } else if (data == (null || undefined)) {
      axiosResponse = await axios.get(url, config);
    } else if (config == (null || undefined)) {
      axiosResponse = await axios.get(url, data);
    } else {
      axiosResponse = await axios.get(url, data, config);
    }
    axiosData = axiosResponse != null ? axiosResponse.data : null;

    return axiosData;
  } catch (error) {
    msgResponse = "ERROR in sendGetRequest() helper function.";
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return null;
  }
};

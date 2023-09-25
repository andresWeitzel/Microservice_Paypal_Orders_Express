//External
import * as dotenv from "dotenv";
import 'dotenv/config';
const axios = require("axios");


/**
 * @description Controlle to get an access token from paypal api
 * @param {any} req any type
 * @param {any} res any type
 * @returns  an object with the token and information from paypal api
 * @example
 */
export const getAccessToken = async(req,res)=> {
    try {
      await axios.post(
        req.url
        ,new URLSearchParams({
        'grant_type': 'client_credentials'
      }),
      {
        auth: {
          username: req.apiPaypalClientValue,
          password: req.apiPaypalSecretKeyValue
        }
      }).then(function (response) {
        console.log(response);
      });
    } catch (error) {
      console.log(`Error in getAccessToken controller. Caused by ${error}`);
    }
  }
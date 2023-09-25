//External
import  {Request, Response} from 'express';
import "dotenv/config";
const axios = require("axios");
//Const-vars
let tokenData: any;
let axiosResponse:any;
let reqBody: any 

/**
 * @description Controlle to get an access token from paypal api
 * @param {any} req any type
 * @param {any} res any type
 * @returns  an object with the token and information from paypal api
 * @example
 */
export const getAccessToken = async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    console.log(`Error in getAccessToken controller. Caused by ${error}`);
    tokenData = null;
  }
  res.status(200).send(tokenData);
};

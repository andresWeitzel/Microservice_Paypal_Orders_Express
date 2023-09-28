//External
import { Request } from "express";
const axios = require("axios");
//Const-vars
let reqBody: any;
let axiosResponse: any;
let tokenData: any;

export const getAccessTokenFromPaypal = async (req: Request, credentials:any) => {
  try {
    reqBody = req.body;
    axiosResponse = await axios.post(
      reqBody.url,
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
  } catch (error) {
    console.error(`ERROR in function getAccessTokenFromPaypal(). Caused by ${error} .`);
    tokenData=null;
  }
  return tokenData;
};

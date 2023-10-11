//External Imports
const { Validator } = require("node-input-validator");
//Const/vars
let validateCheck: any;
let validatorObj: any;
let eventHeadersObj: any;
let msgResponse: string;
let msgLog: string;

/**
 * @description We validate the request headers parameters
 * @param {Object} eventHeaders event.headers type
 * @returns a boolean
 * @example Content-Type, Authorization, etc
 */
export const validateHeadersParams = async (eventHeaders: any) => {
  eventHeadersObj = null;
  validatorObj = null;
  validateCheck = false;

  try {
    if (eventHeaders != null) {
      eventHeadersObj = {
        headers: {
          contentType: await eventHeaders["content-type"],
          authorization: await eventHeaders["authorization"]
        }
      };
      validatorObj = new Validator(
        {
          eventHeadersObj
        },
        {
          "eventHeadersObj.headers.contentType":
            "required|string|minLength:10|maxLength:40",
          "eventHeadersObj.headers.authorization":
            "required|string|minLength:100|maxLength:500"
        }
      );
      validateCheck = await validatorObj.check();
    }

    return validateCheck;
  } catch (error) {
    msgResponse = "ERROR in validateHeadersParams() function.";
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return false;
  }
};

//External Imports
const { Validator } = require("node-input-validator");
//Const/vars
let validateCheck;
let validatorObj;
let eventHeadersObj;

/**
 * @description We validate the request headers parameters
 * @param {Object} eventHeaders event.headers type
 * @returns a boolean
 * @example Content-Type, Authorization, etc
 */
export const validateHeadersParams = async (eventHeaders:any) => {
  eventHeadersObj = null;
  validatorObj= null;
  validateCheck = false;

  try{
    if(eventHeaders != null){

      eventHeadersObj ={
        headers:{
          contentType: await eventHeaders["content-type"],
          authorization: await eventHeaders["authorization"]
        }
      }
      validatorObj = new Validator(
        {
          eventHeadersObj,
        },
        {
          "eventHeadersObj.headers.contentType": "required|string|minLength:10|maxLength:40",
          "eventHeadersObj.headers.authorization": "required|string|minLength:100|maxLength:500"
        }
      );
      validateCheck = await validatorObj.check();
    }

  } catch (error) {
    console.log(error);
  }

  return validateCheck;
}


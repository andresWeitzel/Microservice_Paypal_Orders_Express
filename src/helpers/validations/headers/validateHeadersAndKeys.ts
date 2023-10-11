//Helpers
import { validateHeadersParams } from "../validator/http/requestHeadersParams";
import { validateAuthHeaders } from "../validator/auth/headers";
//Const-vars
let validateReqParams: boolean;
let validateAuth: boolean;
let validateResponse: string;
let msgResponse: string;
let msgLog: string;

/**
   * @description Validates that all the necessary headers are correct.
   * @param {Object} inputEventHeaders event.headers type
   * @returns a json object with status code and msj
   * @example  return await bodyResponse(
        statusCode.UNAUTHORIZED,
        "Not authenticated, check Authorization"
      );
   */
export const validateHeadersAndKeys = async (inputEventHeaders: any) => {
  try {
    //-- start with validation Headers  ---
    validateResponse = "";

    validateReqParams = await validateHeadersParams(inputEventHeaders);

    if (!validateReqParams) {
      validateResponse =
        "Bad request, check missing or malformed headers. Content-type and Authorization is necessary";
    }

    validateAuth = await validateAuthHeaders(inputEventHeaders);

    if (!validateAuth) {
      validateResponse =
        "Not authenticated, check Authorization. This field must be of type Basic Authentication ";
    }
    //-- end with validation Headers  ---

    return validateResponse;
  } catch (error) {
    msgResponse = "ERROR in validateHeadersAndKeys() function.";
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return null;
  }
};

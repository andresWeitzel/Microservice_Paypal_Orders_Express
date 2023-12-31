//Const/vars
let authorization: string;
let validate: any;

/**
 * @description check the x-api-key and the bearer token. In case they are not correct, we return false
 * @param {Object} eventHeaders event.headers type
 * @returns a boolean
 */
export const validateAuthHeaders = async (eventHeaders: any) => {
  authorization = eventHeaders["authorization"] || "";
  validate = true;

  if (
    !(authorization.includes("Basic") || authorization.includes("Bearer")) ||
    authorization == (null || undefined)
  ) {
    validate = false;
  }
  return validate;
};

import { IS_FAIL, CLEAR_STATE } from "../constants/typeAction";
import { StatusActionType } from "../interfaces/StatusActionTypes";


/**
 * IsError reducer
 *
 * Version 1.0
 *
 * Date: 08-06-2021
 *
 * Copyright 
 *
 * Modification Logs:
 * DATE               AUTHOR          DESCRIPTION
 * -----------------------------------------------------------------------
 * 08-06-2021         DuyHV9           Create
 */

const initialState: string = '';

/**
 * IsError reducer 
 * 
 * @param isError 
 * @param action 
 * @returns message
 */
function isErrorReducer(isError = initialState, action: StatusActionType) {

  switch (action.type) {
    case IS_FAIL:
      return action.payload;
    case CLEAR_STATE:
      return action.payload;
    default:
      return isError;
  }
}

export default isErrorReducer;

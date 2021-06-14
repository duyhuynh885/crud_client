import {
  IS_SUCCESS,
  CLEAR_STATE,
} from "../constants/typeAction";
import { StatusActionType } from "../interfaces/StatusActionTypes";
/**
 * IsSuccess reducer
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
 * IsSuccess reducer
 * 
 * @param success 
 * @param action 
 * @returns message
 */
function tutorialReducer(success = initialState, action: StatusActionType) {

  switch (action.type) {
    case IS_SUCCESS:
      return action.payload;
    case CLEAR_STATE:
      return null;
    default:
      return success;
  }
}

export default tutorialReducer;

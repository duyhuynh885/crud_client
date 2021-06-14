import * as types from "../constants/typeAction";
/**
 * Entity Action Type
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


/**
 * isFailAction interface
 * 
 */
export interface isFailAction {
  type: typeof types.IS_SUCCESS;
  payload: string;
}

/**
 * isSuccessAction interface
 * 
 */
export interface isSuccessAction {
  type: typeof types.IS_FAIL;
  payload: string;
}
/**
 * clearStatesAction interface
 * 
 */
export interface clearStatesAction {
  type: typeof types.CLEAR_STATE;
  payload: null;
}
export type StatusActionType =
  | isSuccessAction
  | isFailAction
  | clearStatesAction
export type StatusActionEntity = StatusActionType;

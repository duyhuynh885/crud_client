import * as types from "../constants/typeAction";
import { IUser } from "./index";
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
 * retrieveUsersAction interface
 * 
 */
export interface retrieveUsersAction {
  type: typeof types.RETRIEVE_USERS;
  payload: IUser[];
}

/**
 * createUserAction interface
 * 
 */
export interface createUserAction {
  type: typeof types.CREATE_USER;
  payload: IUser;
}
/**
 * updateUsersAction interface
 * 
 */
export interface updateUsersAction {
  type: typeof types.UPDATE_USER;
  payload: IUser;
}
/**
 * deleteUsersAction interface
 * 
 */
export interface deleteUsersAction {
  type: typeof types.DELETE_USER;
  payload: string;
}

export type UserActionType =
  | retrieveUsersAction
  | createUserAction
  | updateUsersAction
  | deleteUsersAction;
export type UserActionEntity = UserActionType;

import {
  CREATE_USER,
  RETRIEVE_USERS,
  UPDATE_USER,
  DELETE_USER,
  DELETE_ALL_USERS,
} from "../constants/typeAction";
import { IUser } from "../interfaces";
import { UserActionType } from "../interfaces/UserActionTypes";
/**
 * User reducer
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
 * InitialState
 *
 */
const initialState: any = [];
/**
 * User reducer
 * 
 * @param users 
 * @param action 
 * @returns user
 */
function tutorialReducer(
  users = initialState,
  action: UserActionType
): IUser[] {
  switch (action.type) {
    case CREATE_USER:
      return [...users, action.payload];
    case RETRIEVE_USERS:
      return action.payload.filter((user: any) => user.detele !== true);
    case UPDATE_USER:
      return users.map((product: any) => {
        if (product.id === action.payload.id) {
          return {
            ...product,
            ...action.payload,
          };
        } else {
          return product;
        }
      });
    case DELETE_USER:
      return users.filter((id: any) => id !== action.payload);
    default:
      return users;
  }
}

export default tutorialReducer;

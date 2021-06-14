import * as types from "../constants/typeAction";
import { ICart } from "./index";
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
 * addToCartAction interface
 * 
 */
export interface addToCartAction {
  type: typeof types.ADD_TO_CART;
  payload:ICart;
}

/**
 * removeFromCartAction interface
 * 
 */
export interface removeFromCartAction {
  type: typeof types.REMOVE_FROM_CART;
  payload: string;
}

/**
 * updateCartItemCountAction interface
 * 
 */
export interface updateCartItemCountAction {
  type: typeof types.UPDATE_CART_ITEM_COUNT;
  payload: ICart;
}


export type CartActionType =
  | addToCartAction
  | removeFromCartAction
  | updateCartItemCountAction

export type CartActionEntity = CartActionType;

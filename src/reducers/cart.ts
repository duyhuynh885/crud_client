import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_ITEM_COUNT,
} from "../constants/typeAction";
import { ICart, IProduct } from "../interfaces";
import { CartActionType } from "../interfaces/CartActionType";
/**
 * Cart reducer
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
const initialState: ICart[] = [];

function tutorialReducer(
  carts = initialState,
  action: CartActionType
): ICart[] {
  switch (action.type) {
    case ADD_TO_CART:

    case REMOVE_FROM_CART:

    case UPDATE_CART_ITEM_COUNT:

    default:
      return carts;
  }
}

export default tutorialReducer;

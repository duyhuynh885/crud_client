import {
  CREATE_PRODUCT,
  RETRIEVE_PRODUCTS,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from "../constants/typeAction";
import { IProduct } from "../interfaces";
import { ProductActionType } from "../interfaces/ProductActionTypes";
/**
 * Product reducer
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
const initialState: IProduct[] = [];

/**
 * UserReducer
 * 
 * @param products 
 * @param action 
 * @returns product
 */
function tutorialReducer(
  products = initialState,
  action: ProductActionType
): IProduct[] {
  switch (action.type) {
    case RETRIEVE_PRODUCTS:
      return action.payload;
    case CREATE_PRODUCT:
      return [...products, action.payload];
    case UPDATE_PRODUCT:
      return products.map((product: any) => {
        if (product.id === action.payload.id) {
          return {
            ...product,
            ...action.payload,
          };
        } else {
          return product;
        }
      });
    case DELETE_PRODUCT:
      return products.filter((id: any) => id !== action.payload);
    default:
      return products;
  }
}

export default tutorialReducer;

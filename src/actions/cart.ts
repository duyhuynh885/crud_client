import {
  CREATE_PRODUCT,
  RETRIEVE_PRODUCTS,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  IS_SUCCESS,
  IS_FAIL,
  CLEAR_STATE,
} from "../constants/typeAction";
import ProductsService from "../services/ProductsService";
import { IProduct } from "../interfaces";
import { handleError } from "../helper/helper";
import { Dispatch } from "redux";
import { StatusActionEntity } from "../interfaces/StatusActionTypes";
import { CartActionEntity } from "../interfaces/CartActionType";

/**
 * Add to card action
 * @param id product id to add detail product
 * @param price price of product
 * @param count number of product
 * @returns 
 */
export const addToCart =
  (id: string, price: string, count = 1) =>
    async (dispatch: Dispatch<CartActionEntity | StatusActionEntity>) => {
      //
    };

/**
 * Remove from cart
 * @param id product id to remove product from cart
 * @param data contains product information
 * @returns re
 */
export const removeFromCart =
  (id: string, data: IProduct) =>
    async (dispatch: Dispatch<CartActionEntity | StatusActionEntity>) => { };

/**
 * Update cart item action
 * @param id product id to update cart item quantity
 * @returns 
 */
export const updateCartItemCount =
  (id: string) =>
    async (dispatch: Dispatch<CartActionEntity | StatusActionEntity>) => { };

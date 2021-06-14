import * as types from "../constants/typeAction";
import { IProduct } from "./index";
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
 * retrieveProductsAction interface
 * 
 */
export interface retrieveProductsAction {
  type: typeof types.RETRIEVE_PRODUCTS;
  payload: IProduct[];
}

/**
 * createProductAction interface
 * 
 */
export interface createProductAction {
  type: typeof types.CREATE_PRODUCT;
  payload: IProduct;
}
/**
 * updateProductsAction interface
 * 
 */
export interface updateProductsAction {
  type: typeof types.UPDATE_PRODUCT;
  payload: IProduct;
}

/**
 * deleteProductsAction interface
 * 
 */
export interface deleteProductsAction {
  type: typeof types.DELETE_PRODUCT;
  payload: string;
}

export type ProductActionType =
  | retrieveProductsAction
  | createProductAction
  | updateProductsAction
  | deleteProductsAction;
export type ProductActionEntity = ProductActionType;

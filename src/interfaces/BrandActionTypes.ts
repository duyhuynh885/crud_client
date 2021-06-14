import * as types from "../constants/typeAction";
import { IBrand } from "./index";
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
 * retrieveBrandsAction interface
 * 
 */
export interface retrieveBrandsAction {
  type: typeof types.RETRIEVE_BRANDS;
  payload: IBrand[];
}

/**
 * createBrandAction interface
 * 
 */
export interface createBrandAction {
  type: typeof types.CREATE_BRAND;
  payload: IBrand;
}

/**
 * updateBrandAction interface
 * 
 */
export interface updateBrandAction {
  type: typeof types.UPDATE_BRAND;
  payload: IBrand;
}

/**
 * deleteBrandAction interface
 * 
 */
export interface deleteBrandAction {
  type: typeof types.DELETE_BRAND;
  payload: string;
}

export type BrandActionType =
  | retrieveBrandsAction
  | createBrandAction
  | updateBrandAction
  | deleteBrandAction;
export type BrandActionEntity = BrandActionType;

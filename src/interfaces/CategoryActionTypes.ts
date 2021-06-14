import * as types from "../constants/typeAction";
import { ICategory } from "./index";

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
 * retrieveCategoriesAction interface
 * 
 */
export interface retrieveCategoriesAction {
  type: typeof types.RETRIEVE_CATEGORIES;
  payload: ICategory[];
}

/**
 * createCategoryAction interface
 * 
 */
export interface createCategoryAction {
  type: typeof types.CREATE_CATEGORY;
  payload: ICategory;
}

/**
 * updateCategoriesAction interface
 * 
 */
export interface updateCategoriesAction {
  type: typeof types.UPDATE_CATEGORY;
  payload: ICategory;
}

/**
 * deleteCategoriesAction interface
 * 
 */
export interface deleteCategoriesAction {
  type: typeof types.DELETE_CATEGORY;
  payload: string;
}

export type CategoryActionType =
  | retrieveCategoriesAction
  | createCategoryAction
  | updateCategoriesAction
  | deleteCategoriesAction;
export type CategoryActionEntity = CategoryActionType;

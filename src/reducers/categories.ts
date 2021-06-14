import {
  CREATE_CATEGORY,
  RETRIEVE_CATEGORIES,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  DELETE_ALL_CATEGORIES,
} from "../constants/typeAction";
import { ICategory } from "../interfaces";
import { CategoryActionType } from "../interfaces/CategoryActionTypes";

/**
 * Category reducer
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
const initialState: ICategory[] = [];

function categoriesReducer(categories = initialState, action: CategoryActionType) {
 

  switch (action.type) {
    case CREATE_CATEGORY:
      return [...categories, action.payload];

    case RETRIEVE_CATEGORIES:
      return action.payload.filter((pro: any) => pro.delete !== true);

    case UPDATE_CATEGORY:
      return categories.map((category: any) => {
        if (category.id === action.payload.id) {
          return {
            ...category,
            ...action.payload,
          };
        } else {
          return category;
        }
      });

    case DELETE_CATEGORY:
      return categories.filter((id: any) => id !== action.payload);
    default:
      return categories;
  }
}

export default categoriesReducer;

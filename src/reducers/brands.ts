import {
  CREATE_BRAND,
  RETRIEVE_BRANDS,
  UPDATE_BRAND,
  DELETE_BRAND,
} from "../constants/typeAction";
import { IBrand } from "../interfaces";
import { BrandActionType } from "../interfaces/BrandActionTypes";
/**
 * Brands reducer
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
const initialState: IBrand[] = [];

function brandsReducer(brands = initialState, action: BrandActionType) {
  switch (action.type) {
    case CREATE_BRAND:
      return [...brands, action.payload];

    case RETRIEVE_BRANDS:
      return action.payload.filter((pro: any) => pro.delete !== true);

    case UPDATE_BRAND:
      return brands.map((category: any) => {
        if (category.id === action.payload.id) {
          return {
            ...category,
            ...action.payload,
          };
        } else {
          return category;
        }
      });

    case DELETE_BRAND:
      return brands.filter((id: any) => id !== action.payload);
    default:
      return brands;
  }
}

export default brandsReducer;

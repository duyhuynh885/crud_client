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
import { ProductActionEntity } from "../interfaces/ProductActionTypes";
import { Dispatch } from "redux";
import { StatusActionEntity } from "../interfaces/StatusActionTypes";

/**
 * Create product action
 * @param product contains create information
 * @returns create product service
 */
export const createProduct =
  (product: IProduct) =>
    async (dispatch: Dispatch<ProductActionEntity | StatusActionEntity>) => {
      await ProductsService.create(product).then(
        (response) => {
          dispatch({
            type: CREATE_PRODUCT,
            payload: response.data,
          });
          dispatch({
            type: IS_SUCCESS,
            payload: "Add Product Success",
          });
        },
        (error) => {
          const message = handleError(error);
          dispatch({
            type: IS_FAIL,
            payload: message,
          });
        }
      );
    };

/**
 * Clear state action
 * @returns 
 */
export const clearState =
  () => async (dispatch: Dispatch<StatusActionEntity>) => {
    dispatch({
      type: CLEAR_STATE,
      payload: null,
    });
  };

/**
 * Get all products action
 * @returns get all products service
 */
export const retrieveProducts =
  () =>
    async (dispatch: Dispatch<ProductActionEntity | StatusActionEntity>) => {
      await ProductsService.getAll().then(
        (response) => {
          dispatch({
            type: RETRIEVE_PRODUCTS,
            payload: response.data,
          });
        },
        (error) => {
          const message = handleError(error);
          dispatch({
            type: IS_FAIL,
            payload: message,
          });
        }
      );
    };

/**
 * Update product action
 * @param id to update product
 * @param data contains update information
 * @returns update product service
 */
export const updateProduct =
  (id: string, data: IProduct) =>
    async (dispatch: Dispatch<ProductActionEntity | StatusActionEntity>) => {
      await ProductsService.update(id, data).then(
        (response) => {
          dispatch({
            type: UPDATE_PRODUCT,
            payload: response.data,
          });
          dispatch({
            type: IS_SUCCESS,
            payload: "Update Product Success",
          });
        },
        (error) => {
          const message = handleError(error);

          dispatch({
            type: IS_FAIL,
            payload: message,
          });
        }
      );
    };

/**
 * Delete product action
 * @param id to delete product
 * @returns remove product service
 */
export const deleteProduct =
  (id: string) =>
    async (dispatch: Dispatch<ProductActionEntity | StatusActionEntity>) => {
      await ProductsService.remove(id).then(
        (response) => {
          dispatch({
            type: DELETE_PRODUCT,
            payload: id,
          });
          dispatch({
            type: IS_SUCCESS,
            payload: "Delete Product Success",
          });
        },
        (error) => {
          const message = handleError(error);

          dispatch({
            type: IS_FAIL,
            payload: message,
          });
        }
      );
    };

/**
 * Find product by name action
 * @param productName to find product
 * @returns find by name service
 */
export const findByName =
  (productName: string) =>
    async (dispatch: Dispatch<ProductActionEntity | StatusActionEntity>) => {
      await ProductsService.findByName(productName).then(
        (response) => {
          dispatch({
            type: RETRIEVE_PRODUCTS,
            payload: response.data,
          });
        },
        (error) => {
          const message = handleError(error);
          dispatch({
            type: IS_FAIL,
            payload: message,
          });
        }
      );
    };

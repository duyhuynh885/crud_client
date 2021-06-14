import {
  CREATE_BRAND,
  RETRIEVE_BRANDS,
  UPDATE_BRAND,
  DELETE_BRAND,
  IS_SUCCESS,
  IS_FAIL,
  CLEAR_STATE,
} from "../constants/typeAction";
import BrandService from "../services/BrandService";
import { IBrand } from "../interfaces";
import { StatusActionEntity } from "../interfaces/StatusActionTypes";
import { BrandActionType } from "../interfaces/BrandActionTypes";
import { Dispatch } from "redux";
import { handleError } from "../helper/helper";

/**
 * Create brand action
 * @param brand contains create information
 * @returns create service
 */
export const createBrand =
  (brand: IBrand | any) =>
    async (dispatch: Dispatch<BrandActionType | StatusActionEntity>) => {
      await BrandService.create(brand).then(
        (response) => {
          dispatch({
            type: CREATE_BRAND,
            payload: response.data,
          });
          dispatch({
            type: IS_SUCCESS,
            payload: "Add brand Success",
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
 */
export const clearState =
  () => async (dispatch: Dispatch<StatusActionEntity>) => {
    dispatch({
      type: CLEAR_STATE,
      payload: null,
    });
  };

/**
 * Get all brands action
 * @returns get all service
 */
export const retrieveBrands =
  () =>
    async (dispatch: Dispatch<BrandActionType | StatusActionEntity>) => {
      await BrandService.getAll().then(
        (response) => {
          dispatch({
            type: RETRIEVE_BRANDS,
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
 * Update brand action
 * @param id to update brand
 * @param data contains update information
 * @returns update service
 */
export const updateBrand =
  (id: string, data: IBrand) =>
    async (dispatch: Dispatch<BrandActionType | StatusActionEntity>) => {
      await BrandService.update(id, data).then(
        (response) => {
          dispatch({
            type: UPDATE_BRAND,
            payload: response.data,
          });
          dispatch({
            type: IS_SUCCESS,
            payload: "Update brand Success",
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
 * Delete brand action
 * @param id to delete brand
 * @returns remove action
 */
export const deleteBrand =
  (id: string) =>
    async (dispatch: Dispatch<BrandActionType | StatusActionEntity>) => {
      await BrandService.remove(id).then(
        (response) => {
          dispatch({
            type: DELETE_BRAND,
            payload: id,
          });
          dispatch({
            type: IS_SUCCESS,
            payload: "Delete brand Success",
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

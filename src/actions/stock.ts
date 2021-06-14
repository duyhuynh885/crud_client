import {
  IS_SUCCESS,
  IS_FAIL,
  CLEAR_STATE,
  CREATE_STOCK,
  RETRIEVE_STOCKS,
  UPDATE_STOCK,
  DELETE_STOCK,
} from "../constants/typeAction";
import StockService from "../services/StockService";
import { IStock } from "../interfaces";
import { handleError } from "../helper/helper";
import { StockActionEntity } from "../interfaces/StockActionTypes";
import { Dispatch } from "redux";
import { StatusActionEntity } from "../interfaces/StatusActionTypes";

/**
 * Create stock action
 * @param stock contains create information
 * @returns create stock service
 */
export const createStock =
  (stock: IStock) =>
  async (dispatch: Dispatch<StockActionEntity | StatusActionEntity>) => {
    await StockService.create(stock).then(
      (response) => {
        dispatch({
          type: CREATE_STOCK,
          payload: response.data,
        });
        dispatch({
          type: IS_SUCCESS,
          payload: "Add stock Success",
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
 * Get all stocks action
 * @returns get all stocks service
 */
export const retrieveStocks =
  () => async (dispatch: Dispatch<StockActionEntity | StatusActionEntity>) => {
    await StockService.getAll().then(
      (response) => {
        dispatch({
          type: RETRIEVE_STOCKS,
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
 * Update stock action
 * @param id to update stock
 * @param data contains update information
 * @returns update stock service
 */
export const updateStock =
  (id: string, data: IStock) =>
  async (dispatch: Dispatch<StockActionEntity | StatusActionEntity>) => {
    await StockService.update(id, data).then(
      (response) => {
        dispatch({
          type: UPDATE_STOCK,
          payload: response.data,
        });
        dispatch({
          type: IS_SUCCESS,
          payload: "Update stock Success",
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
 * Delete stock action
 * @param id to delete stock
 * @returns remove stock service
 */
export const deleteStock =
  (id: string) =>
  async (dispatch: Dispatch<StockActionEntity | StatusActionEntity>) => {
    await StockService.remove(id).then(
      (response) => {
        dispatch({
          type: DELETE_STOCK,
          payload: id,
        });
        dispatch({
          type: IS_SUCCESS,
          payload: "Delete stock Success",
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
 * Find stock by name action
 * @param stockName to find stock
 * @returns find by name service
 */
export const findByName =
  (stockName: string) =>
  async (dispatch: Dispatch<StockActionEntity | StatusActionEntity>) => {
    await StockService.findByName(stockName).then(
      (response) => {
        dispatch({
          type: RETRIEVE_STOCKS,
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

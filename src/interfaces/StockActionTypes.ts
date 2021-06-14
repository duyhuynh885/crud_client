import * as types from "../constants/typeAction";
import { IStock } from "./index";
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
 * retrieveStocksAction interface
 * 
 */
export interface retrieveStocksAction {
  type: typeof types.RETRIEVE_STOCKS;
  payload: IStock[];
}

/**
 * createStockAction interface
 * 
 */
export interface createStockAction {
  type: typeof types.CREATE_STOCK;
  payload: IStock;
}

/**
 * updateStockAction interface
 * 
 */
export interface updateStockAction {
  type: typeof types.UPDATE_STOCK;
  payload: IStock;
}

/**
 * deleteStockAction interface
 * 
 */

export interface deleteStockAction {
  type: typeof types.DELETE_STOCK;
  payload: string;
}

export type StockActionType =
  | retrieveStocksAction
  | createStockAction
  | updateStockAction
  | deleteStockAction;
export type StockActionEntity = StockActionType;

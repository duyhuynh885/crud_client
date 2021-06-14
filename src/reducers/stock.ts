import {
    RETRIEVE_STOCKS,
    CREATE_STOCK,
    UPDATE_STOCK,
    DELETE_STOCK,
  } from "../constants/typeAction";
  import { IStock } from "../interfaces";
  import { StockActionType } from "../interfaces/StockActionTypes";
  /**
   * Stock
   *  reducer
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
  const initialState: IStock[] = [];
  
  /**
   * StockReducer
   * 
   * @param stocks 
   * @param action 
   * @returns stock
   */
  function tutorialReducer(
    stocks = initialState,
    action: StockActionType
  ): IStock[] {
    switch (action.type) {
      case RETRIEVE_STOCKS:
        return action.payload;
      case CREATE_STOCK:
        return [...stocks, action.payload];
      case UPDATE_STOCK:
        return stocks.map((stock: any) => {
          if (stock.id === action.payload.id) {
            return {
              ...stock,
              ...action.payload,
            };
          } else {
            return stock;
          }
        });
      case DELETE_STOCK:
        return stocks.filter((id: any) => id !== action.payload);
      default:
        return stocks;
    }
  }
  
  export default tutorialReducer;

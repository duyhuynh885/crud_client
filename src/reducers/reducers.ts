import { combineReducers } from "@reduxjs/toolkit";
import products from "./products";
import isSuccess from "./isSuccess";
import isError from "./isError";
import categories from "./categories";
import auth from "./auth";
import users from "./users";
import carts from "./cart";
import brands from "./brands";
import stocks from "./stock"
/**
 * rootReducer
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
const rootReducer = combineReducers({
  products,
  categories,
  isSuccess,
  isError,
  auth,
  users,
  carts,
  brands,
  stocks
});

export default rootReducer;

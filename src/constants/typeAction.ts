/**
 * Type Action
 * <p>
 * Version 1.0
 * <p>
 * Date: 30-05-2021
 * <p>
 * Copyright By DuyHV9
 * <p>
 * Modification Logs:
 * DATE             AUTHOR              DESCRIPTION
 * -------------------------------------------------
 * 07-06-2021       DuyHV9              Type action for redux
 */
//***********/ type action handle Products
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const RETRIEVE_PRODUCTS = "RETRIEVE_PRODUCTS";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const DELETE_ALL_PRODUCTS = "DELETE_ALL_PRODUCTS";

//***********/ type action handle STOCKs
export const CREATE_STOCK = "CREATE_STOCK";
export const RETRIEVE_STOCKS = "RETRIEVE_STOCKS";
export const UPDATE_STOCK = "UPDATE_STOCK";
export const DELETE_STOCK = "DELETE_STOCK";

//***********/ type action handle CATEGORIES
export const CREATE_CATEGORY = "CREATE_CATEGORY";
export const RETRIEVE_CATEGORIES = "RETRIEVE_CATEGORIES";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const DELETE_CATEGORY = "DELETE_CATEGORY";
export const DELETE_ALL_CATEGORIES = "DELETE_ALL_CATEGORIES";
export const FIND_BY_NAME = "FIND_BY_NAME";

//***********/ type action handle BRANDS
export const CREATE_BRAND = "CREATE_BRAND";
export const RETRIEVE_BRANDS = "RETRIEVE_BRANDS";
export const UPDATE_BRAND = "UPDATE_BRAND";
export const DELETE_BRAND = "DELETE_BRAND";
export const DELETE_ALL_BRANDS = "DELETE_ALL_BRANDS";
export const FIND_BY_NAME_BRAND = "FIND_BY_NAME_BRAND";

//***********/ type action handle USERS
export const CREATE_USER = "CREATE_USER";
export const RETRIEVE_USERS = "RETRIEVE_USERS";
export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";
export const DELETE_ALL_USERS = "DELETE_ALL_USERS";

//***********/ type action handle Success and Fail
export const IS_SUCCESS = "IS_SUCCESS";
export const IS_FAIL = "IS_FAIL";
export const CLEAR_STATE = "CLEAR_STATE";

//***********/ type action handle Authentication
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";
export const SEND_MAIL = "LOGOUT";

//***********/ type action handle Cart
export const ADD_TO_CART = "REGISTER_SUCCESS";
export const REMOVE_FROM_CART = "REGISTER_FAIL";
export const UPDATE_CART_ITEM_COUNT = "LOGIN_SUCCESS";

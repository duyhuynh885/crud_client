import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { authenticate, isAuth } from "../helper/auth";
import http from "../http-common";
import { IUser } from "../interfaces/index";
import authHeader from "./AuthHeader";

const AUTH_URL = "/auth/";
/**
 * AuthService
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
 * Register
 * 
 * @param username 
 * @param email 
 * @param password 
 * @returns 
 */
const register = (username: string, email: string, password: string) => {
  return http.post(AUTH_URL + "signup", {
    username,
    email,
    password,
  });
};
/**
 * sendMail
 * 
 * @param email  
 * @returns 
 */
const sendMail = (email: string) => {
  return http.post(AUTH_URL + "forget-password", {
    email,
  });
};

/**
 * Login
 * 
 * @param username 
 * @param password 
 * @returns 
 */
const login = (username: string, password: string) => {
  return http
    .post(AUTH_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        authenticate(response);
      }
      return response.data;
    });
};

/**
 * resetPassword
 * 
 * @param username 
 * @param token 
 * @returns 
 */
const resetPassword = (password: string, token: string) => {
  console.log(token, password);

  return http.post(AUTH_URL + "reset-password", {
    password,
    token,
  });
};


/**
 * changePassword
 * 
 * @param newPassword 
 * @param oldPassword 
 * @param id 
 * @returns 
 */
const changePassword = (newPassword: string ,oldPassword : string, id: string) => {
  console.log("new" + newPassword + "old" + oldPassword + "id" + id);
  return http.post("/user/"+ "change_password/" +id, {
    newPassword,
    oldPassword,
  }, { headers: authHeader() });
};


export default {
  register,
  login,
  sendMail,
  resetPassword,
  changePassword
};

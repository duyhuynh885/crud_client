import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  IS_SUCCESS,
  IS_FAIL,
} from "../constants/typeAction";

import AuthService from "../services/AuthService";
import { IUser } from "../interfaces";
import { handleError } from "../helper/helper";

/**
 * Register new account action
 * @param username to register new account
 * @param email to register new account
 * @param password to register new account
 * @returns register service
 */
export const register =
  (username: string, email: string, password: string) => async (dispatch: any) => {
    return await AuthService.register(username, email, password).then(
      (response) => {
        dispatch({
          type: REGISTER_SUCCESS,
        });

        dispatch({
          type: IS_SUCCESS,
          payload: response.data.message,
        });
      },
      (error) => {
        const message = handleError(error);
        dispatch({
          type: REGISTER_FAIL,
        });

        dispatch({
          type: IS_FAIL,
          payload: message,
        });
      }
    );
  };

/**
 * Login action
 * @param username to authentication 
 * @param password to authentication 
 * @returns login service
 */
export const login = (username: string, password: string) => async (dispatch: any) => {
  return await AuthService.login(username, password).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });
      dispatch({
        type: IS_SUCCESS,
        payload: "Login Successfully!",
      });
    },
    (error) => {
      const message = handleError(error);

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: IS_FAIL,
        payload: message,
      });
    }
  );
};

/**
 * Send mail service
 * @param email to send a link contain reset password token
 * @returns send email service
 */
export const sendMail = (email: string) => async (dispatch: any) => {
  return await AuthService.sendMail(email).then(
    (data) => {
      dispatch({
        type: IS_SUCCESS,
        payload: "Send Mail Successfully, Please Check Your Email!",
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
 * Reset password action
 * @param password to reset password
 * @param token check token exist in database
 * @returns reset password service
 */
export const resetPassword =
  (password: string, token: string) => (dispatch: any) => {
    return AuthService.resetPassword(password, token).then(
      (data) => {
        dispatch({
          type: IS_SUCCESS,
          payload: "Reset Password Successfully!",
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
 * Change password action
 * @param newPassword to change password
 * @param oldPassword confirm old password match with password in database
 * @param id to change password
 * @returns change password service
 */
export const changePassword =
  (newPassword: string, oldPassword: string, id: string) => (dispatch: any) => {
    return AuthService.changePassword(newPassword, oldPassword, id).then(
      (data) => {
        dispatch({
          type: IS_SUCCESS,
          payload: "Reset Password Successfully!",
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
 * Logout action
 */
export const logout = () => (dispatch: any) => {
  dispatch({
    type: LOGOUT,
  });
};

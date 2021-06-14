import {
  CREATE_USER,
  RETRIEVE_USERS,
  UPDATE_USER,
  DELETE_USER,
  DELETE_ALL_USERS,
  IS_SUCCESS,
  IS_FAIL,
  CLEAR_STATE,
} from "../constants/typeAction";
import UserService from "../services/UserService";
import { IUser } from "../interfaces";
import { handleError } from "../helper/helper";
import { StatusActionEntity } from "../interfaces/StatusActionTypes";
import { UserActionEntity } from "../interfaces/UserActionTypes";
import { Dispatch } from "redux";

/**
 * Create user action
 * @param user contains create information
 * @returns create user service
 */
export const createUser =
  (user: IUser | any) =>
    async (dispatch: Dispatch<UserActionEntity | StatusActionEntity>) => {
      await UserService.create(user).then(
        (response) => {
          dispatch({
            type: CREATE_USER,
            payload: response.data,
          });
          dispatch({
            type: IS_SUCCESS,
            payload: "Add USER Success",
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
 * Clear state
 * @returns 
 */
export const clearState = () => async (dispatch: any) => {
  dispatch({
    type: CLEAR_STATE,
    payload: null,
  });
};

/**
 * Get all users action
 * @returns get all users service
 */
export const retrieveUsers = () => async (dispatch: any) => {
  await UserService.getAll().then(
    (res) => {
      dispatch({
        type: RETRIEVE_USERS,
        payload: res.data,
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
 * Update user action
 * @param id to update user
 * @param data contains update information
 * @returns update user service
 */
export const updateUser =
  (id: string, data: IUser) =>
    async (dispatch: Dispatch<UserActionEntity | StatusActionEntity>) => {
      await UserService.update(id, data).then(
        (response) => {
          dispatch({
            type: UPDATE_USER,
            payload: data,
          });
          dispatch({
            type: IS_SUCCESS,
            payload: "Update USER Success",
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
 * Delete user action
 * @param id to delete user
 * @returns remove user service
 */
export const deleteUser =
  (id: string) =>
    async (dispatch: Dispatch<UserActionEntity | StatusActionEntity>) => {
      await UserService.remove(id).then(
        (response) => {
          dispatch({
            type: DELETE_USER,
            payload: id,
          });
          dispatch({
            type: IS_SUCCESS,
            payload: "Delete USER Success",
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
 * Find user by name action
 * @param userName to find user
 * @returns find by name service
 */
export const findByName =
  (userName: string) =>
    async (dispatch: Dispatch<UserActionEntity | StatusActionEntity>) => {
      const res = await UserService.findByName(userName).then(
        (response) => {
          dispatch({
            type: RETRIEVE_USERS,
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

import {
  CREATE_CATEGORY,
  RETRIEVE_CATEGORIES,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  DELETE_ALL_CATEGORIES,
  IS_SUCCESS,
  IS_FAIL,
  CLEAR_STATE,
  FIND_BY_NAME,
} from "../constants/typeAction";
import CategoriesService from "../services/CategoriesService";
import { ICategory } from "../interfaces";
import { StatusActionEntity } from "../interfaces/StatusActionTypes";
import { CategoryActionEntity } from "../interfaces/CategoryActionTypes";
import { Dispatch } from "redux";
import { handleError } from "../helper/helper";

/**
 * Create category action
 * @param category contains create information
 * @returns create service
 */
export const createCategory =
  (category: ICategory | any) =>
    async (dispatch: Dispatch<CategoryActionEntity | StatusActionEntity>) => {
      await CategoriesService.create(category).then(
        (response) => {
          dispatch({
            type: CREATE_CATEGORY,
            payload: response.data,
          });
          dispatch({
            type: IS_SUCCESS,
            payload: "Add category Success",
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
 * Get all categories action
 * @returns get all category service
 */
export const retrieveCategories =
  () =>
    async (dispatch: Dispatch<CategoryActionEntity | StatusActionEntity>) => {
      await CategoriesService.getAll().then(
        (response) => {
          dispatch({
            type: RETRIEVE_CATEGORIES,
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

// export const findByName = (categoryName: string) => async (dispatch: any) => {
//   try {
//     const res = await CategoriesService.findByName(categoryName);

//     dispatch({
//       type: FIND_BY_NAME,
//       payload: res.data,
//     });
//     return true;
//   } catch (err) {
//     dispatch({
//       type: IS_FAIL,
//       payload: err.message,
//     });
//     return false;
//   }
// };

/**
 * Update category action
 * @param id to update detail category
 * @param data contains update information
 * @returns update category service
 */
export const updateCategory =
  (id: string, data: ICategory) =>
    async (dispatch: Dispatch<CategoryActionEntity | StatusActionEntity>) => {
      await CategoriesService.update(id, data).then(
        (response) => {
          dispatch({
            type: UPDATE_CATEGORY,
            payload: response.data,
          });
          dispatch({
            type: IS_SUCCESS,
            payload: "Update category Success",
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
 * Delete category action
 * @param id to delete category
 * @returns remove category service
 */
export const deleteCategory =
  (id: string) =>
    async (dispatch: Dispatch<CategoryActionEntity | StatusActionEntity>) => {
      await CategoriesService.remove(id).then(
        (response) => {
          dispatch({
            type: DELETE_CATEGORY,
            payload: id,
          });
          dispatch({
            type: IS_SUCCESS,
            payload: "Delete category Success",
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

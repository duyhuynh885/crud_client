import { getCookie } from "../helper/auth";
import http from "../http-common";
import { ICategory } from "../interfaces";
import authHeader from "./AuthHeader";
const token = getCookie("token");
/**
 * Category service
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
 * Get all
 *
 * @returns list category
 */
const getAll = () => {
  return http.get<ICategory[]>("/categories", { headers: authHeader() });
};

/**
 * Get category by id
 * @param id
 * @returns category
 */
const get = (id: string) => {
  return http.get<ICategory>(`/categories/${id}`, { headers: authHeader() });
};

/**
 * Create new category
 * 
 * @param data 
 * @returns 
 */
const create = (data: ICategory) => {
  return http.post<ICategory>("/categories", data, { headers: authHeader() });
};

/**
 * Update category
 * @param id 
 * @param data 
 * @returns 
 */
const update = (id: string, data: ICategory) => {
  return http.put<ICategory>(`/categories/${id}`, data, {
    headers: authHeader(),
  });
};

/**
 * Remove category
 * @param id 
 * @returns 
 */
const remove = (id: string) => {
  return http.delete<ICategory>(`/categories/${id}`, { headers: authHeader() });
};


/**
 * Find category name
 * @param brandName 
 * @returns brand
 */
const findByName = (categoryName: string) => {
  return http.get<ICategory[]>(`/categories/find/`, {
    params: { categoryName },
    headers: authHeader(),
  });
};

const categoriesService = {
  getAll,
  get,
  create,
  update,
  remove,
  findByName,
};

export default categoriesService;

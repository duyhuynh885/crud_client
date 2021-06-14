import { getCookie } from "../helper/auth";
import http from "../http-common";
import { IBrand } from "../interfaces";
import authHeader from "./AuthHeader";
const token = getCookie("token");

/**
 * Brand service
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
 * @returns list brand
 */
const getAll = () => {
  return http.get<IBrand[]>("/brands", { headers: authHeader() });
};

/**
 * Get brand by id
 * @param id
 * @returns brand
 */
const get = (id: string) => {
  return http.get<IBrand>(`/brands/${id}`, { headers: authHeader() });
};
/**
 * Create new brand
 * 
 * @param data 
 * @returns 
 */
const create = (data: IBrand) => {
  return http.post<IBrand>("/brands", data, { headers: authHeader() });
};

/**
 * Update brand
 * @param id 
 * @param data 
 * @returns 
 */
const update = (id: string, data: IBrand) => {
  return http.put<IBrand>(`/brands/${id}`, data, {
    headers: authHeader(),
  });
};
/**
 * Remove brand
 * @param id 
 * @returns 
 */
const remove = (id: string) => {
  return http.delete<IBrand>(`/brands/${id}`, { headers: authHeader() });
};
/**
 * Find brand name
 * @param brandName 
 * @returns brand
 */
const findByName = (brandName: string) => {
  return http.get<IBrand[]>(`/brands/find/`, {
    params: { brandName },
    headers: authHeader(),
  });
};

const brandsService = {
  getAll,
  get,
  create,
  update,
  remove,
  findByName,
};

export default brandsService;

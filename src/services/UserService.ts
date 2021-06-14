import http from "../http-common";
import { IUser } from "../interfaces";
import authHeader from "./AuthHeader";

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
 * @returns list user
 */
const getAll = () => {
  return http.get<IUser[]>("/users", { headers: authHeader() });
};

/**
 * Get user by id
 * @param id
 * @returns user
 */
const get = (id: string) => {
  return http.get<IUser>(`/users/${id}`, { headers: authHeader() });
};


/**
 * Create new user
 * 
 * @param data 
 * @returns 
 */

const create = (data: IUser | any) => {
  return http.post<IUser>("/users", data, { headers: authHeader() });
};


/**
 * Update user
 * @param id 
 * @param data 
 * @returns 
 */
const update = (id: string, data: any) => {
  return http.put<IUser>(`/users/${id}`, data, { headers: authHeader() });
};
/**
 * Remove user
 * @param id 
 * @returns 
 */
const remove = (id: string) => {
  return http.delete<IUser>(`/users/${id}`, { headers: authHeader() });
};

/**
 * Find user name
 * @param brandName 
 * @returns user
 */
const findByName = (username: string) => {
  return http.get<IUser[]>(`/users/find/`, {
    params: { username },
    headers: authHeader(),
  });
};

const usersService = {
  getAll,
  get,
  create,
  update,
  remove,
  findByName,
};

export default usersService;

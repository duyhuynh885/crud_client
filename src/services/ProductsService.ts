import { getCookie } from "../helper/auth";
import http from "../http-common";
import { IProduct } from "../interfaces";
import authHeader from "./AuthHeader";
const token = getCookie("token");

/**
 * Product service
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
 * @returns list product
 */
const getAll = () => {
  return http.get<IProduct[]>("/products", { headers: authHeader() });
};
/**
 * Get product by id
 * @param id
 * @returns brand
 */
const get = (id: string) => {
  return http.get<IProduct>(`/products/${id}`, { headers: authHeader() });
};
/**
 * Create new product
 * 
 * @param data 
 * @returns 
 */
const create = (data: IProduct) => {
  return http.post<IProduct>("/products", data, { headers: authHeader() });
};
/**
 * Update product
 * @param id 
 * @param data 
 * @returns 
 */
const update = (id: string, data: IProduct) => {
  return http.put<IProduct>(`/products/${id}`, data, { headers: authHeader() });
};
/**
 * Remove product
 * @param id 
 * @returns 
 */
const remove = (id: string) => {
  return http.delete<IProduct>(`/products/${id}`, { headers: authHeader() });
};

/**
 * Find product name
 * @param brandName 
 * @returns brand
 */
const findByName = (productName: string) => {
  return http.get<IProduct[]>(`/products?name=${productName}`, { headers: authHeader() });
};

const ProductService = {
  getAll,
  get,
  create,
  update,
  remove,
  findByName,
};

export default ProductService;

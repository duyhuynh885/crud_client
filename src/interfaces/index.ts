/**
 * interface
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

export interface IProduct {
  id: string;
  category: ICategory;
  brand:IBrand;
  productName: string;
  description: string;
  image1: string;
  price: number;
  isDelete: boolean;
  createdDate: Date;
  updateDate: Date;
}

export interface IStock {
  id: string;
  product:IProduct;
  weight: number;
  stockNumber: number;
  saledQuanlity: number;
  madeIn: String;
  isDelete: boolean;
}

export interface ICategory {
  id: number;
  categoryName: string;
  isDelete: boolean;
}

export interface IBrand {
  id: number;
  brandName: string;
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  isDelete: boolean;
  isBlocked: boolean;
  roles: Array<any>;
  firstName: String;
  lastName: String;
  registrationDate: Date;
  phone: string;
  city: string;
  district: string;
  ward: string;
  address: string;
  isDetele: boolean;
  counter: number;
}

export interface ICart {
  id: string;
  price: string;
  count: number;
}

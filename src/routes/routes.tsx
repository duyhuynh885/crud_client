import Login from '../components/Auth/Login/Login';
import Register from '../components/Auth/Register/Register';
import ForgetPassword from "../components/Auth/ForgetPasssword/ForgetPassword";
import ChangePassword from "../components/Auth/ChangePassword/ChangePassword";
import ResetPassword from "../components/Auth/ResetPassword/ResetPassword";

// Container
import ListUser from "../container/Admin/ListUser/ListUser";
import ListCategory from "../container/Admin/ListCategory/ListCategory";
import ListProducts from "../container/Admin/ListProduct/ListProducts";
import FormProduct from "../components/Admin/FormProduct/FormProduct";
import FormCategory from "../components/Admin/FormCategory/FormCategory";
import Dashboard from "../components/Admin/Dashboard/Dashboard";

import FormUser from "../components/Admin/FormUser/FormUser";
import AdminProfile from "../components/Admin/AdminProfile/AdminProfile";
import FormBrand from '../components/Admin/FormBrand/FormBrand';
import ListBrand from '../container/Admin/ListBrand/ListBrand';
import ListStock from '../container/Admin/ListStock/ListStock';
import FormStock from '../components/Admin/FormStock/FormStock';

/**
 * AuthRoute
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
 * 08-06-2021         DuyHV9           Config routes for app
 */
export const AdminRoutes = [
  {
    path: "/admin",
    exact: true,
    main: () => <Dashboard />,
  },
  {
    path:"/admin/product",
    exact: true,
    main: () => <ListProducts />,
  },
  {
    path: "/admin/product/add",
    main: () => <FormProduct />,
  },
  {
    path: "/admin/product/update/:productId",
    main: () => <FormProduct />,
  },
  {
    path: "/admin/category",
    exact: true,
    main: () => <ListCategory />,
  },
  {
    path: "/admin/category/add",
    main: () => <FormCategory />,
  },
  {
    path: "/admin/category/update/:categoryId",
    main: () => <FormCategory />,
  },
  {
    path: "/admin/user",
    exact: true,
    main: () => <ListUser />,
  },
  {
    path: "/admin/user/add",
    main: () => <FormUser />,
  },
  {
    path: "/admin/user/update/:userId",
    main: () => <FormUser />,
  },
  {
    path: "/admin/brand",
    exact: true,
    main: () => <ListBrand />,
  },
  {
    path: "/admin/brand/add",
    main: () => <FormBrand />,
  },
  {
    path: "/admin/brand/update/:brandId",
    main: () => <FormBrand />,
  },
  {
    path: "/admin/stock",
    exact: true,
    main: () => <ListStock />,
  },
  {
    path: "/admin/stock/update/:stockId",
    main: () => <FormStock />,
  },
  {
    path: "/admin/profile",
    exact: true,
    main: () => <AdminProfile />,
  },
  {
    path: "/admin/user/changePassword/:userId",
    exact: true,
    main: () => <ChangePassword />,
  },
];

export const AuthRoutes = [
  {
    path: "/login",
    exact: true,
    main: () => <Login />,
  },
  {
    path: "/register",
    exact: true,
    main: () => <Register />,
  },
  {
    path: "/forget-password",
    exact: true,
    main: () => <ForgetPassword />,
  },
  {
    path: "/reset-password/:token",
    exact: true,
    main: () => <ResetPassword />,
  }
];


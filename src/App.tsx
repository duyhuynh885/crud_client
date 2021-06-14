import React from "react";
import Home from "./pages/User/Home";
import 'antd/dist/antd.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import AdminRoute from './routes/AdminRoute.jsx';
import AuthRoute from './routes/AuthRoute.jsx';
import Admin from './pages/Admin/Admin';
import NotFound from "./pages/NotFound/NotFound";

import { AdminRoutes, AuthRoutes } from './routes/routes';
import ListProduct from "./container/Users/ListProduct/ListProduct";
import CartList from "./components/User/Cart/CartList/CartList";
import ProductDetail from "./components/User/ProductDetail/ProductDetail";

/**
 * App
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
 * 08-06-2021         DuyHv9           Create
 */
const App: React.FC = (props) => {
  return (
    <div className="App">
      <ToastContainer position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <BrowserRouter >

        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/product/detail/:id'  component={ProductDetail} />
            <AuthRoute path='/checkout' exact={true}  component={CartList}/>
          {/* Auth Route */}
          {AuthRoutes.map((route, index) => (
            <Route
             
              path={route.path}
              exact={route.exact}
              children={<route.main />}
            />
          ))}
          <Admin>
            {AdminRoutes.map((route, index) => (
              <AdminRoute
                
                path={route.path}
                exact={route.exact}
                component={route.main}
              />
            ))}
          </Admin>


          {/* Admin Route */}

          <Route component={NotFound}></Route>
          <Redirect to='/404' />

        </Switch>
      </BrowserRouter>
    </div>
  );
};



export default App;


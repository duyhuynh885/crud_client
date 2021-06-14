import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from "../helper/auth";


/**
 * AdminRoute
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
const AdminRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuth() && isAuth().roles[0] === 'ROLE_ADMIN' ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }}
                />
            )
        }
    ></Route>
);

export default AdminRoute;
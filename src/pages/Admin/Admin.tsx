import React from 'react'
import "./Admin.css"
import SideBar from '../../components/Admin/SideBar/SideBar';
import HeaderAdmin from '../../components/Admin/HeaderAdmin/HeaderAdmin';
import WrapAdmin from './WrapAdmin'
import { isAuth } from '../../helper/auth';
import { Redirect } from 'react-router';

/**
 * Admin
 * <p>
 * Version 1.0
 * <p>
 * Date: 30-05-2021
 * <p>
 * Copyright By DuyHV9
 * <p>
 * Modification Logs:
 * DATE             AUTHOR              DESCRIPTION
 * -------------------------------------------------
 * 07-06-2021       DuyHV9           Create
 */
const Admin: React.FC<{}> = (props) => {

    return (
        <div className="admin" >
            <div className="sidebar__menu">

                <WrapAdmin component={SideBar} />
            </div>
            <div className="sidebar__content">
                {/* <HeaderAdmin /> */}
                <WrapAdmin component={HeaderAdmin} />
                {props.children}
            </div>
        </div>
    )
}

export default Admin;
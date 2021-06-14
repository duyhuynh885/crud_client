import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Header } from 'antd/lib/layout/layout'
import { Badge, Button, Dropdown, Menu } from 'antd'
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { signout } from '../../../helper/auth';
import { logout } from '../../../actions/auth';
import { toast } from 'react-toastify';
import './NavBar.css'
import SubMenu from 'antd/lib/menu/SubMenu';
import { ShoppingCartOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons';
import Search from 'antd/lib/input/Search';
import { ICategory } from '../../../interfaces';
import { retrieveCategories } from '../../../actions/categories';
/**
 * NavBar
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
const NavBar: React.FC = () => {
    /*
    *  Get state from store
    */
    const { user: currentUser } = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();
    const history = useHistory()
    const categories = useSelector((state: any) => state.categories)

    console.log(categories);

    useEffect(() => {
        dispatch(retrieveCategories())
    }, [])

    /**
    * Handle Show Categories
    * @param categories contains categories information
    */
    const handleShowCategories = (categories: ICategory[]) => {
        const result = categories.map((category: ICategory, index: number) => {
            return <Menu.Item key={index}>
                <Link to={`products`}>{category.categoryName}</Link>
            </Menu.Item>
        })
        return result;
    }
    /**
    * Handle log out
    */
    const logOut = () => {
        signout(() => {
            dispatch(logout());
            history.push("/");
            toast.success("Sign out Successfully");
        });

    };
    const dropdown = (
        <Menu>
            <Menu.Item>
                <Button style={{ width: 70 }} type="primary">
                    <Link to="/login">Login</Link>
                </Button>
            </Menu.Item>
            <Menu.Item>
                <Button style={{ width: 70 }}>
                    <Link to="/register">Register</Link>
                </Button>
            </Menu.Item>
        </Menu>
    );
    const dropdownItem = (
        <Menu>
            <Menu.Item>
                <Button style={{ width: 70 }} onClick={logOut}>Logout</Button>
            </Menu.Item>

        </Menu>
    );

    return (
        <div className="navBar">
            <div>
                <Button type="link" onClick={() => history.push("/")}>
                    <h4 style={{ fontWeight: 700 }}>FIN3-Shop</h4>
                </Button>

            </div>
            <Menu mode="horizontal" style={{ border: 'none', fontWeight: 600 }}>
                {handleShowCategories(categories)}
            </Menu>
            <div className="navBar__sideRight">
                {/* <Search placeholder="input search text" style={{ width: 0 }} /> */}
                <Button type="link" onClick={() => history.push("/checkout")}>
                    <Badge count={123} dot style={{ border: "none" }}>
                        <ShoppingOutlined />
                    </Badge>
                </Button>

                {!currentUser ? (
                    <Dropdown.Button overlay={dropdown} placement="bottomRight" style={{ marginRight: 20 }} icon={<UserOutlined />}>
                    </Dropdown.Button>
                ) : <Dropdown.Button overlay={dropdownItem} placement="bottomRight" style={{ marginRight: 20 }} icon={<UserOutlined />}>
                </Dropdown.Button>}
            </div>
        </div>
    )
}

NavBar.propTypes = {

}

export default NavBar



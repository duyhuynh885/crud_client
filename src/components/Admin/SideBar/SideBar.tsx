import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Menu, Button, Typography } from 'antd';
import {
    UserOutlined,
    AppstoreOutlined,
    HomeOutlined,
    MailOutlined,
    SolutionOutlined,
    StockOutlined,
} from '@ant-design/icons';
const { SubMenu } = Menu;

/**
 * SideBar
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

const SideBar: React.FC = () => {
    return (
        <Menu
            mode="inline"
            style={{ height: '100vh' }}
            theme="dark"
            title="ADMIN PAGE"
        >
            <div className="sidebar__header">
                <Menu.Item >
                    <span tabIndex={-1} style={{ fontWeight: "bold", fontSize: '20px', color: "white" }}>Admin</span>
                </Menu.Item>
            </div>
            <Menu.Item key="1" icon={<HomeOutlined />}>
                <Link  tabIndex={-1} to="/admin">Home</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<MailOutlined />}>
                <Link tabIndex={-1} to="/admin/product">Product</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<AppstoreOutlined />}>
                <Link tabIndex={-1} to="/admin/category">Category</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<UserOutlined />}>
                <Link tabIndex={-1} to="/admin/user">User</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<SolutionOutlined />}>
                <Link tabIndex={-1} to="/admin/category">Order</Link>
            </Menu.Item>
            <Menu.Item key="6" icon={<SolutionOutlined />}>
                <Link tabIndex={-1} to="/admin/brand">Brand</Link>
            </Menu.Item>
            <Menu.Item key="7" icon={<StockOutlined />}>
                <Link tabIndex={-1} to="/admin/stock">Stock</Link>
            </Menu.Item>
        </Menu>
    )
}

SideBar.propTypes = {

}

export default SideBar


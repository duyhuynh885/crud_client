import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Card, Col, Descriptions, Image, Row, Tag } from 'antd'
import '../ViewProduct/ViewProduct.css'
import { IUser } from '../../../interfaces'


interface IProps {
    viewUser: IUser | any;
}
/**
 * ViewUser
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
const ViewUser = ({ viewUser }: IProps) => {
     /**
     * Handle time converter
     * @param UNIX_timestamp contains time
     */
    function timeConverter(UNIX_timestamp: any) {
        var a = new Date(UNIX_timestamp);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
        return time;
    }
    /**
     * Handle View Roles
     * @param roles contains array roles
     */
    const handleViewRoles = (roles: Array<any>) => {
        switch (roles[0].name) {
          case "ROLE_ADMIN":
            return <Tag>ADMIN</Tag>
            break;
          case "ROLE_USER":
            return <Tag>USER</Tag>
            break;
          case "ROLE_MODERATOR":
            return <Tag>MOD</Tag>
            break;
        }
      }
      
    return (
        <div className="viewProduct">
            <h1 className="viewProduct__title">{viewUser.username}</h1>

            <Descriptions title="About" size="small" layout="horizontal" column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }} bordered>
            <Descriptions.Item label="User ID">{viewUser.id}</Descriptions.Item>

                <Descriptions.Item label="Full Name">{viewUser.lastName + " " + viewUser.firstName}</Descriptions.Item>
                <Descriptions.Item label="Role">{handleViewRoles(viewUser.roles)}</Descriptions.Item>
                <Descriptions.Item label="Email">{viewUser.email}</Descriptions.Item>
                <Descriptions.Item label="Phone">{viewUser.phone}</Descriptions.Item>
                <Descriptions.Item label="Address">{`${viewUser.city}, ${viewUser.district}, ${viewUser.ward}, ${viewUser.address}`}</Descriptions.Item>
            </Descriptions>
            <Descriptions title="Time" size="small" layout="vertical" bordered>
                <Descriptions.Item label="Created Date">{timeConverter(viewUser.registrationDate)}</Descriptions.Item>
            </Descriptions>
            <Descriptions column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                title="Status" size="small" layout="vertical" bordered>
                <Descriptions.Item label="Is Blocked"> <Tag color={viewUser.isBlocked ? 'red':'green'}>
                    {viewUser.isBlocked ? "YES" : "NO"}
                </Tag></Descriptions.Item>
            </Descriptions>
        </div>
    )
}

ViewUser.propTypes = {

}

export default ViewUser


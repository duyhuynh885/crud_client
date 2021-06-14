import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Descriptions, Image, Tag } from 'antd'
import './ViewProduct.css'


interface IProps {
    viewProduct: Object | any;
}

/**
 * ViewProduct
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
const ViewProduct = ({ viewProduct }: IProps) => {


    // handle convert timestamp to DD/MM/YY H:M:S
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

    // handle format price
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',

        // These options are needed to round to whole numbers if that's what you want.
        minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });
    const formatStatus = (status: string) => {
        if (status === 'sold') {
            return (
                <Tag color="red" key={status} >
                    {status.toUpperCase()}
                </Tag>
            );
        } else if (status === 'in stock') {
            return (
                <Tag color='green' key={status}>
                    {status.toUpperCase()}
                </Tag>
            );
        }
    }
    return (
        <div className="viewProduct">
            <h1 className="viewProduct__title">{viewProduct.productName}</h1>

            <Descriptions title="Image" size="small" layout="vertical">
                <Descriptions.Item>
                    <Image
                        width={100}
                        src={viewProduct.image1}
                    /></Descriptions.Item>
            </Descriptions>

            <Descriptions column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                title="Info" size="small" layout="vertical" bordered>
                <Descriptions.Item label="ID Product">{viewProduct.id}</Descriptions.Item>
                <Descriptions.Item label="Category">{viewProduct.category.categoryName}</Descriptions.Item>
                <Descriptions.Item label="Brand">{viewProduct.brand.brandName}</Descriptions.Item>
            </Descriptions>
            <Descriptions column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                style={{ marginTop: "16px" }} size="small" layout="vertical" bordered>
                <Descriptions.Item label="Created Date">{timeConverter(viewProduct.createdDate)}</Descriptions.Item>
                <Descriptions.Item label="Update Date">{timeConverter(viewProduct.updateDate)}</Descriptions.Item>

            </Descriptions>

            <Descriptions title="Description" size="small" layout="vertical" bordered>
                <Descriptions.Item label="Description">{viewProduct.description}</Descriptions.Item>
            </Descriptions>

        </div>
    )
}

ViewProduct.propTypes = {

}

export default ViewProduct


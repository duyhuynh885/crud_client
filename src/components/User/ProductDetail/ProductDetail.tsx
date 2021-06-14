import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router'
import { IProduct } from '../../../interfaces';
import productService from "../../../services/ProductsService";
import confirm from 'antd/lib/modal/confirm';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { handleError } from '../../../helper/helper';
import NavBar from '../NavBar/NavBar';


/**
 * ProductDetail
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
function ProductDetail() {
    /*
    * Initial State For Component 
    */
    const [currentProduct, setCurrentProduct] = useState<IProduct>();

    const { productId } = useParams<any>();



    /**
     * Set field for form if action is update
     */
    useEffect(() => {
        if (productId) {
            productService.get(productId)
                .then(response => {
                    console.log(response.data);
                    setCurrentProduct(response.data)
                })
                .catch(error => {
                    const message = handleError(error)
                    handleConfirmRecord(message)
                })
        }
    }, [])

    const handleConfirmRecord = (Error: string) => {
        confirm({
            title: Error,
            content: "Do you want to reload page",
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            autoFocusButton: "cancel",
            cancelText: 'No',
            onOk() {

            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    return (
        <div>
            <NavBar />
            <h1>deadeadae</h1>
        </div>
    )
}

ProductDetail.propTypes = {

}

export default ProductDetail


import React from 'react'
import PropTypes from 'prop-types'
import { IProduct } from '../../../interfaces'
import { Button, Card } from 'antd'
import Meta from 'antd/lib/card/Meta'
import { ExclamationCircleOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { isAuth } from '../../../helper/auth'
import { Redirect } from 'react-router'
import { AppDispatch, RootState } from '../../../store'
import { useDispatch, useSelector } from 'react-redux'
import productService from "../../../services/ProductsService";
import { useHistory } from "react-router-dom";
import { handleError } from '../../../helper/helper'
import confirm from 'antd/lib/modal/confirm'
import { retrieveProducts } from '../../../actions/products'

interface IProps {

    product: IProduct

}

/**
 * Product
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
const Product: React.FC<IProps> = ({ product }) => {

    const { isLoggedIn } = useSelector((state: RootState) => state.auth);

    /*
    * Initial Something For Component 
    */
    const history = useHistory();
    const dispatch: AppDispatch = useDispatch();

    /**
     * Handle Add To Cart
     */
    const handleAddToCart = () => {
        if (!isLoggedIn) {
            return history.push('/login')
        } else {

        }
    }
    /**
    * Handle View Detail Product
    */
    const handleDetailProduct = () => {
        productService.get(product.id)
            .then(response => {
                history.push(`/product/detail/${product.id}`);
            })
            .catch(error => {

            })
    }


    return (
        <div>

            <Card
                // onClick={() => handleDetailProduct()}
                size="small"
                hoverable={true}
                bordered={true}
                style={{ height: 380, width: 230 }}
                cover={
                    <img
                        alt="example"
                        height="200"
                        style={{ border: "solid 1px #f0f0f0", borderBottom: "none" }}
                        src={product.image1}
                    />
                }
                actions={[
                    <h5 style={{ color: "#cc1c39" }}>${product.price}</h5>,

                    <Button style={{ backgroundColor: "#ffd666", color: "black", border: "yellow" }} className="btn__addToCart" type="primary" size="middle" onClick={() => handleAddToCart()}>
                        Add to cart
                    </Button>
                ]}
            >
                <Meta
                    style={{ height: 100 }}
                    title={product.productName}
                    description={product.description}

                />

            </Card>
        </div>
    )
}

Product.propTypes = {

}

export default Product


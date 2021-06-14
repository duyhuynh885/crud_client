import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Product from '../../../components/User/Product/Product'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { retrieveProducts } from '../../../actions/products';
import { IProduct } from '../../../interfaces';
import { Col, List, Row } from 'antd';

/**
 * ListProduct
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
const ListProduct: React.FC = (props) => {

    /*
    *  Get state from store
    */
    const lsProduct = useSelector((state: RootState) => state.products);

    /*
    * Initial Something For Component 
    */
    const dispatch: AppDispatch = useDispatch();


    console.log(lsProduct);

    useEffect(() => {
        dispatch(retrieveProducts())
    }, []);

    return (
        <div>
           
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 3,
                    lg: 4,
                    xl: 5,
                    xxl: 6
                }}

                pagination={{
                    showSizeChanger: true,
                    pageSizeOptions: ["10", "15", "20", "25"],
                }}
                dataSource={lsProduct}
                renderItem={fabric => (
                    <List.Item>
                        <Product product={fabric} />
                    </List.Item>)}
            />

        </div>
    )
}

ListProduct.propTypes = {

}

export default ListProduct


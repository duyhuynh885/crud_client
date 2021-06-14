import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Button, Radio, Select, Spin } from 'antd';
import { toast } from 'react-toastify';
import { clearState, updateStock } from '../../../actions/stock';
import { useDispatch, useSelector } from 'react-redux';
import { IStock } from '../../../interfaces';
import '../FormProduct/FormProduct.css'

import { useHistory, useParams } from "react-router-dom";
import StockServiceSt from '../../../services/StockService';
import { Prompt } from 'react-router-dom';
import "../../../pages/Admin/Admin.css";
import { LoadingOutlined } from '@ant-design/icons';
import { AppDispatch, RootState } from '../../../store';
import { validateMessages } from '../../../constants/messages';
const layout = {
    labelCol: {
        span: 5,
    },
    wrapperCol: {
        span: 15,
    },
};


/**
 * FormProduct
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
const FormStock: React.FC = () => {
    /*
    * Initial State For Component 
    */
    const [loading, setLoading] = useState(false);
    const [isFormIncomplete, setIsFormIncomplete] = useState(false);
    const { stockId } = useParams<any>();
    /*
    *  Get state from store
    */
    const Success = useSelector((state: RootState) => state.isSuccess)
    const Error = useSelector((state: RootState) => state.isError)
    const lsCategory = useSelector((state: RootState) => state.categories)
    const lsBrand = useSelector((state: RootState) => state.brands)
    /*
    * Initial Something For Component 
    */
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const { Option } = Select;
    const [form] = Form.useForm();
    const dispatch: AppDispatch = useDispatch();
    const history = useHistory();
    const onReset = () => {
        form.resetFields();
    };

    /*
    * Initial Function For Component 
    */
    /**
      * Handle update action
      * @param values contains update information
      * @param id to update category
      */
    const handleUpdate = (values: any, id: string) => {
        setLoading(true)
        dispatch(updateStock(id, values.stock))
    }

    /**
    * Handle create action
    * @param values contains create create information
    */
    const handleCreate = (values: any) => {

    }

    /**
     * Clear state
     */
    useEffect(() => {
        return () => {
            if (form.getFieldsValue(true).stock !== undefined) setIsFormIncomplete(true);
            dispatch(clearState());
            onReset();
        };
    }, []);


    /**
     * Load error or success message if exist
     */
    useEffect(() => {
        if (Error) {
            toast.error(Error);
            dispatch(clearState());
        }
        if (Success) {
            toast.success(Success);
            dispatch(clearState());
            history.push("/admin/stock")
            onReset()
        }
        // neu nhu state success and error thay doi thi se call lai useEffect
    }, [Success, Error]);


    /**
     * Create or update action if submit success
     * @param values contains create or update information
     */
    const onFinish = async (values: any) => {
        if (!stockId) handleCreate(values);
        else handleUpdate(values, stockId);
    };


    /**
     * Set values for form fields if action is update
     */
    useEffect(() => {
        if (stockId) {
            StockServiceSt.get(stockId)
                .then(response => {
                    form.setFieldsValue({
                        stock: response.data
                    });
                })
                .catch(error => {
                    toast.error(error.message);
                })
        }
    }, [])

    /**
     * Process if submit fail
     * @param errorInfo show warning message
     */
    const onFinishFailed = (errorInfo: any) => {
        toast.warning(errorInfo);
    };
    /**
     * handle Change
     * @param e event
     */

    /**
     * handle Back
     */
    const handleBack = () => {
        history.goBack()
    }

    return (

        <div className="formProduct">
            <Prompt
                when={isFormIncomplete}
                message="Are you sure you want to leave?" />
            <div className="formProduct__container">
                <h2 className="formProduct__title">{stockId ? 'Update Stock' : 'Add Stock'}</h2>
                <h1 style={{ borderBottom: 'solid 1px rgb(224, 215, 215)', marginBottom: '30px' }}></h1>
                <Form {...layout}
                    form={form}
                    colon={false}
                    name="nest-messages"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    labelAlign="left"
                    validateMessages={validateMessages}>
                    <div className="formProduct__form">
                        <div className="formProduct__items">
                            <Form.Item
                                name={['stock', 'stockNumber']}
                                label="Stock Number"
                                rules={[
                                    {
                                        required: true,
                                        type: 'number',
                                        min: 0,
                                        max: 99999
                                    },
                                ]}
                            >
                                <InputNumber tabIndex={1} style={{ borderRadius: "6px", marginLeft: "5px", width: "80%" }} />
                            </Form.Item>

                            <Form.Item
                                name={['stock', 'weight']}
                                label="Weight"
                                rules={[
                                    {
                                        required: true,
                                        type: 'number',
                                        min: 0,
                                        max: 99999
                                    },
                                ]}
                            >
                                <InputNumber
                                    tabIndex={2}
                                    style={{ borderRadius: "6px", marginLeft: "5px", width: "30%" }} />
                            </Form.Item>


                            <Form.Item name={['stock', 'madeIn']}
                                rules={[
                                    {
                                        type: "string",
                                        required: true,
                                        max: 90,
                                    }
                                ]} label="Made In" >
                                <Input tabIndex={3} style={{ borderRadius: "6px", marginLeft: "5px", width: "80%" }} />
                            </Form.Item>
                        </div>


                    </div>
                    <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}> <Spin spinning={loading} indicator={antIcon} /></div>

                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Form.Item>

                            <Button tabIndex={4} onClick={() => onReset()} style={{ marginRight: "15px", width: "5rem" }} size="middle">
                                Clear
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button tabIndex={5} danger type="primary" onClick={() => handleBack()} style={{ marginRight: "15px", width: "5rem" }} size="middle" color="#d9f7be">
                                Back
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button tabIndex={6} type="primary" htmlType="submit" style={{ width: "5rem" }} size="middle" >
                                Submit
                            </Button>
                        </Form.Item>
                    </div>
                </Form>

            </div>
        </div>

    )
}

export default FormStock;


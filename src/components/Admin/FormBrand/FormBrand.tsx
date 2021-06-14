import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { toast } from 'react-toastify';
import '../FormProduct/FormProduct.css'
import { clearState, createBrand, updateBrand } from '../../../actions/brand';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import brandService from '../../../services/BrandService';
import "../../../pages/Admin/Admin.css";
import { AppDispatch, RootState } from '../../../store';
import {validateMessages}  from '../../../constants/messages';

const layout = {
    labelCol: {
        span: 2,
    },
    wrapperCol: {
        span: 13,
    },
};

/**
 * FormBrand
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
const FormBrand: React.FC = () => {

    /*
    *  Get state from store
    */
    const Success = useSelector((state: RootState) => state.isSuccess)
    const Error = useSelector((state: RootState) => state.isError)

    /*
    * Initial Something For Component 
    */
    const [form] = Form.useForm();
    const dispatch: AppDispatch = useDispatch();
    const history = useHistory();
    const { brandId } = useParams<any>();

    /**
     * Reset data fields
     */
    const onReset = () => {
        form.resetFields();
    };

    /**
     * Handle update brand
     * @param values contains update information
     * @param id 
     */
    const handleUpdate = (values: any, id: string) => {
        dispatch(updateBrand(id, values.brand))
        onReset()
    }

    /**
     * Handle create brand
     * @param values contains create information
     */
    const handleCreate = (values: any) => {
        const brand = values.brand
        dispatch(createBrand(brand));
        onReset()
    }

    /**
     * Clear state at beginning
     */
    useEffect(() => {
        return () => {
            dispatch(clearState());
            onReset();
        };
    }, []);

    /**
     * Load error and success if exist
     */
    useEffect(() => {
        if (Error) {
            toast.error(Error);
            dispatch(clearState());

        }
        if (Success) {
            toast.success(Success);
            setTimeout(() => {
                history.push("/admin/brand")
            }, 300);
            dispatch(clearState());
        }
    }, [Success, Error]);

    /**
     * Create or update action if submit success
     * @param values contains update or create information
     */
    const onFinish = async (values: any) => {
        if (!brandId) handleCreate(values);
        else handleUpdate(values, brandId);
    };

    /**
     * Set field for form if action is update
     */
    useEffect(() => {
        if (brandId) {
            brandService.get(brandId)
                .then(response => {
                    form.setFieldsValue({ brand: response.data });
                })
                .catch(error => {
                    toast.error(error.message);
                })
        }
    }, [])

    /**
     * Process if submit form fail
     * @param errorInfo show warning message
     */
    const onFinishFailed = (errorInfo: any) => {
        toast.warning(errorInfo);
    };

    return (

        <div className="formProduct">
            <div className="formProduct__container">
                <h2 className="formProduct__title">{brandId ? 'Update Brand' : 'Add Brand'}</h2>
                <h1 style={{ borderBottom: 'solid 1px rgb(224, 215, 215)', marginBottom: '30px' }}></h1>

                <Form
                    {...layout} form={form}
                    name="nest-messages"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    validateMessages={validateMessages}
                    labelAlign="left"
                    colon={false}

                >
                    <div className="formProduct__form">
                        <div className="formProduct__items">
                            <Form.Item
                                name={['brand', 'brandName']}
                                label="Name"
                                rules={[
                                    {
                                        required: true
                                    },
                                    {
                                        max: 64, message: "Name max length 64 character!"
                                    }
                                    ,
                                    {
                                        whitespace: false
                                    }
                                ]}
                            >
                                <Input tabIndex={1} style={{ borderRadius: "6px", marginLeft: "5px" }} />
                            </Form.Item>
                        </div>
                    </div>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button tabIndex={2} onClick={() => onReset()} style={{ marginRight: "15px", width: "5rem" }} size="middle">
                            Clear
                            </Button>
                        <Button tabIndex={3} danger type="primary" onClick={() => history.goBack()} style={{ marginRight: "15px", width: "5rem" }} size="middle" color="#d9f7be">
                            Back
                              </Button>
                        <Button tabIndex={4} type="primary" htmlType="submit" style={{ width: "5rem" }} size="middle" >
                            Submit
                            </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>

    )
}

export default FormBrand;

import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { toast } from 'react-toastify';
import '../FormProduct/FormProduct.css'
import { clearState, createCategory, updateCategory } from '../../../actions/categories';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import categoriesService from '../../../services/CategoriesService';
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

interface IProps {
    match: string;
}

/**
 * FormCategory
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
const FormCategory: React.FC = () => {

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
    const { categoryId } = useParams<any>();

    /**
     * Reset data fields
     */
    const onReset = () => {
        form.resetFields();
    };

    /**
     * Handle update action
     * @param values contains update information
     * @param id to update category
     */
    const handleUpdate = (values: any, id: string) => {
        dispatch(updateCategory(id, values.category))
        onReset()
    }
    
    /**
     * Handle create action
     * @param values contains create create information
     */
    const handleCreate = (values: any) => {
        const cate = values.category
        dispatch(createCategory(cate));
        onReset()
    }

    /**
     * Clear state
     */
    useEffect(() => {
        return () => {
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
            setTimeout(() => {
                history.push("/admin/category")
            }, 300);
            dispatch(clearState());
        }
    }, [Success, Error]);

    /**
     * Create or update action if submit success
     * @param values contains create or update information
     */
    const onFinish = async (values: any) => {
        if (!categoryId) handleCreate(values);
        else handleUpdate(values, categoryId);
    };

    /**
     * Set values for form fields if action is update
     */
    useEffect(() => {
        if (categoryId) {
            categoriesService.get(categoryId)
                .then(response => {
                    form.setFieldsValue({ category: response.data });
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


    return (

        <div className="formProduct">
            <div className="formProduct__container">
                <h2 className="formProduct__title">{categoryId ? 'Update Category' : 'Add Category'}</h2>
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
                                name={['category', 'categoryName']}
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

export default FormCategory;

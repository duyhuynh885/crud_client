import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Button, Radio, Select, Upload, Spin } from 'antd';
import axios, { CancelTokenSource } from 'axios';
import { toast } from 'react-toastify';
import '../FormProduct/FormProduct.css'

import { clearState, createUser, updateUser } from '../../../actions/users';
import { useDispatch, useSelector } from 'react-redux';
import { IUser } from '../../../interfaces';
import { useHistory, useParams } from "react-router-dom";
import UserService from '../../../services/UserService'
import "../../../pages/Admin/Admin.css";
import { LoadingOutlined } from '@ant-design/icons';
import addressVN from '../../../addressVN.json';
import { AppDispatch, RootState } from '../../../store';
import { validateMessages } from '../../../constants/messages';


const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 15,
    },
};

const defaultPosts: IUser[] = [];
const FormUser: React.FC = () => {
    /*
    * Initial State For Component 
    */
    const [imageUrl, setImageUrl] = useState<String>();
    const [file, setFile] = useState<any>();
    const [loading, setLoading] = useState(false);
    const [idCity, setIdCity] = useState<number>();
    const [idDistrict, setIdDistrict] = useState<number>();
    const [currentRole, setCurrentRole] = useState();
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
    const { userId } = useParams<any>();
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const { Option } = Select;
    /*
    * Initial Function For Component 
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

        // Handle convert roles number to role array 
        const roles: Array<String> = [];
        if (values.user.roles == 1) roles.push("user");
        else if (values.user.roles == 2) roles.push("mod")
        else if (values.user.roles == 3) roles.push("admin")
        const userCreate = {
            ...values.user,
            roles: roles
        }
        dispatch(updateUser(id, userCreate))
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
            setLoading(false)
            dispatch(clearState());
        }
        if (Success) {
            toast.success(Success);
            setLoading(false)
            dispatch(clearState());
            history.push("/admin/user")
            onReset()
        }
    }, [Success, Error]);

    /**
     * Create or update action if submit success
     * @param values contains create or update information
     */
    const onFinish = async (values: any) => {
        handleUpdate(values, userId);
    };


    /**
     * Set values for form fields if action is update
     */
    useEffect(() => {
        if (userId) {
            UserService.get(userId)
                .then(response => {
                    form.setFieldsValue({
                        user: {
                            ...response.data,
                            roles: response.data.roles[0].id
                        }

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
     * Handle Change City
     * @param e contains create City information
     */
    function handleChangeCity(e: any) {
        setIdCity(e)
        form.setFieldsValue({
            user: {
                ward: null,
                district: null,
            }
        })
        console.log(form.getFieldValue(['user', 'ward']));
    }
    /**
     * Handle Change District
     * @param e contains create District information
     */
    function handleChangeDistrict(e: any) {
        setIdDistrict(e)
        console.log(e);

        form.setFieldsValue({
            user: {
                ward: null,

            }
        })
        console.log(form.getFieldValue(['user', 'ward']));

    }

    const handleBack = () => {
        history.goBack()
    }
    /**
     * Handle show District
     * @param e contains create District information
     */
    const handleShowDistrict = (idCity: any) => {
        if (idCity) {
            const indexCity = addressVN.findIndex((item: any) => item.Name === idCity)
            const lsDistrict = addressVN[indexCity].Districts
            return lsDistrict.map((item: any) => {
                return <Option key={item.id} value={item.Name}>{item.Name}</Option>
            })
        } else {
            return null
        }
    }
    /**
     * Handle show District
     * @param e contains create District information
     */
    const handleShowWard = (idDistrict: any) => {
        if (idDistrict && idCity) {
            const indexCity = addressVN.findIndex((item: any) => item.Name === idCity)
            const lsDistrict = addressVN[indexCity].Districts
            const indexDistrict = lsDistrict.findIndex((item: any) => item.Name === idDistrict)
            const lsWard = addressVN[indexCity].Districts[indexDistrict].Wards
            return lsWard.map((item: any) => {
                return <Option key={item.id} value={item.Name}>{item.Name}</Option>
            })
        } else {
            return null
        }
    }

    /**
     * Reset field 
     */
    useEffect(() => {
        form.setFieldsValue({
            user: {
                district: null,
                ward: null
            }
        })
    }, [idCity])
    /**
     * Reset field 
     */
    useEffect(() => {
        form.setFieldsValue({
            user: {
                ward: null
            }
        })
    }, [idDistrict])
    return (
        <div className="formProduct">
            <div className="formProduct__container">
                <h2 className="formProduct__title">{userId ? 'Update user' : 'Add user'}</h2>
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
                                name={['user', 'username']}
                                label="Username"

                            >
                                <Input tabIndex={1} style={{ borderRadius: "6px", marginLeft: "5px", width: "80%" }} disabled={userId ? true : false} />
                            </Form.Item>

                            <Form.Item
                                name={['user', 'email']}
                                label="Email"
                            >
                                <Input tabIndex={2} style={{ borderRadius: "6px", marginLeft: "5px", width: "80%" }} disabled={userId ? true : false} />
                            </Form.Item>
                            <Form.Item
                                name={['user', 'firstName']}
                                label="First Name"
                                rules={[
                                    {
                                        type: "string",
                                        max: 65,
                                        whitespace: true
                                    }
                                ]}
                            >
                                <Input tabIndex={3} style={{ borderRadius: "6px", marginLeft: "5px", width: "60%" }} />
                            </Form.Item>
                            <Form.Item
                                name={['user', 'lastName']}
                                label="Last Name"
                                rules={[
                                    {
                                        type: "string",
                                        max: 65,
                                        whitespace: true
                                    }
                                ]}
                            >
                                <Input tabIndex={4} style={{ borderRadius: "6px", marginLeft: "5px", width: "60%" }} />
                            </Form.Item>


                            <Form.Item
                                name={['user', 'phone']}
                                label="Phone Number"
                                rules={[
                                    {
                                        pattern: /^([0-9])\d{10}\b$/,
                                    },
                                ]}
                            >
                                <InputNumber tabIndex={5} style={{ borderRadius: "6px", marginLeft: "5px", width: "80%" }} />
                            </Form.Item>
                        </div>
                        <div className="formProduct__items">
                            <Form.Item
                                name={['user', 'roles']}
                                label="Roles"
                            >
                                <Select tabIndex={6} defaultValue={currentRole} style={{ borderRadius: "6px", width: 120, marginLeft: "5px" }} >
                                    <Option key="3" value={3} >ADMIN</Option>
                                    <Option key="1" value={1} >USER</Option>
                                    <Option key="2" value={2}>MOD</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name={['user', 'city']}
                                label="City"
                            >
                                <Select tabIndex={7} style={{ borderRadius: "6px", marginLeft: "5px", width: "80%" }} onChange={handleChangeCity}>
                                    {addressVN.map((item: any) => <Option key={item.id} value={item.Name}>{item.Name}</Option>)}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name={['user', 'district']}
                                label="District"
                            >
                                <Select tabIndex={8} style={{ borderRadius: "6px", marginLeft: "5px", width: "80%" }} onChange={handleChangeDistrict}>
                                    {idCity ? handleShowDistrict(idCity) : null}
                                </Select>
                            </Form.Item>

                            <Form.Item name={['user', 'ward']}
                                label="Ward" >
                                <Select tabIndex={9} style={{ borderRadius: "6px", marginLeft: "5px", width: "80%" }} >
                                    {idDistrict ? handleShowWard(idDistrict) : null}
                                </Select>
                            </Form.Item>
                            <Form.Item name={['user', 'address']}
                                rules={[
                                    {
                                        max: 65
                                    }
                                ]} label="Address" >
                                <Input.TextArea tabIndex={10} style={{ borderRadius: "6px", marginLeft: "5px", width: "80%" }} autoSize={{ minRows: 1, maxRows: 5 }} />
                            </Form.Item>

                        </div>

                    </div>
                    <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}> <Spin spinning={loading} indicator={antIcon} /></div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Form.Item>

                            <Button tabIndex={11} onClick={() => onReset()} style={{ marginRight: "15px", width: "5rem" }} size="middle">
                                Clear
                        </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button tabIndex={12} danger type="primary" onClick={() => handleBack()} style={{ marginRight: "15px", width: "5rem" }} size="middle" color="#d9f7be">
                                Back
                        </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button tabIndex={13} type="primary" htmlType="submit" style={{ width: "5rem" }} size="middle" >
                                Submit
                        </Button>
                        </Form.Item>
                    </div>
                </Form>

            </div>
        </div >

    )
}

export default FormUser;

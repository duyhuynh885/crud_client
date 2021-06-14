import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Button, Radio, Select, Upload, Spin } from 'antd';
import axios, { CancelTokenSource } from 'axios';
import { toast } from 'react-toastify';
import '../FormProduct/FormProduct.css'

import { clearState, createUser, updateUser } from '../../../actions/users';
import { useDispatch, useSelector } from 'react-redux';
import { IUser } from '../../../interfaces';
import { useHistory, useParams } from "react-router-dom";
import { storage } from '../../../firebase';
import UserService from '../../../services/UserService'
import "../../../pages/Admin/Admin.css";
import { LoadingOutlined } from '@ant-design/icons';
import addressVN from '../../../addressVN.json';
import { isAuth } from '../../../helper/auth';
import { RootState, AppDispatch } from '../../../store'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const { Option } = Select;

const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 15,
    },
};


/**
 * Validate messages
 */
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
        saleQuantity: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};
const defaultPosts: IUser[] = [];

/**
 * AdminProfile
 * <p>
 * Version 1.0
 * <p>
 * Date: 30-05-2021
 * <p>
 * Copyright DuyHV9
 * <p>
 * Modification Logs:
 * DATE             AUTHOR              DESCRIPTION
 * -------------------------------------------------
 * 07-06-2021       DuyHV9           Create
 */
const AdminProfile: React.FC = () => {
    /*
    * Initial State For Component 
    */
    const [file, setFile] = useState<any | null>();
    const [loading, setLoading] = useState(false);
    const [idCity, setIdCity] = useState(null);
    const [idDistrict, setIdDistrict] = useState(null);
    const [imageUrl, setImageUrl] = useState<any | null>();
    /*
    *  Get state from store
    */
    const Success = useSelector((state: RootState) => state.isSuccess)
    const Error = useSelector((state: RootState) => state.isError)
    /*
    * Initial Something For Component 
    */
    const history = useHistory();
    const userAdmin: IUser = isAuth();
    const userId = userAdmin.id;
    const [form] = Form.useForm();
    const dispatch: AppDispatch = useDispatch();

    /*
    * Reset data fields
    */
    const onReset = () => {
        form.resetFields();
    };

    /**
     * Set default value for fields
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
     * Set default value for fields
     */
    useEffect(() => {
        form.setFieldsValue({
            user: {
                ward: null
            }
        })
    }, [idDistrict])

    /**
     * Handle update user
     * @param values contains update information
     * @param id to update user
     */
    const handleUpdate = (values: any, id: string) => {
        setLoading(true)

        const userCreate = {
            ...values.user
        }

        if (file) {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                setLoading(false)
                toast.error('You can only upload JPG/PNG file!');
                setFile(null);
                return;
            }
            const uploadTask = storage.ref(`/images/${file.name}`).put(file);
            uploadTask.on("state_changed", console.log, console.error, () => {
                storage
                    .ref("images")
                    .child(file.name)
                    .getDownloadURL()
                    .then((url) => {
                        userCreate.image1 = url;
                        dispatch(updateUser(id, userCreate))
                    });
            });
        } else {
            dispatch(updateUser(id, userCreate))
        }
    }

    /**
     * Handle create user
     * @param values contains create information
     */
    const handleCreate = (values: any) => {
        setLoading(true)
        const userCreate = {
            ...values.user,
            category: {
                id: values.user.category
            }
        }
        if (file) {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                setLoading(false)
                toast.error('You can only upload JPG/PNG file!');
                setFile(null);
                return;
            }
            const uploadTask = storage.ref(`/images/${file.name}`).put(file);
            uploadTask.on("state_changed", console.log, console.error, () => {
                storage
                    .ref("images")
                    .child(file.name)
                    .getDownloadURL()
                    .then((url) => {
                        userCreate.image1 = url;
                        dispatch(createUser(userCreate));
                    });
            });
        } else {
            setLoading(false)
            toast.warning("Image is required!");
        }
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
     * Create or update action if submit form success
     * @param values contains update or create information
     */
    const onFinish = async (values: any) => {

        if (!userId) handleCreate(values);
        else handleUpdate(values, userId);
    };


    /**
     * Set fields for form if action is update
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
                    // setImageUrl(response.data.image1)
                })
                .catch(error => {
                    toast.error(error.message);
                })
        }
    }, [])

    /**
     * Show warning notification if submit fail
     * @param errorInfo show warning notification 
     */
    const onFinishFailed = (errorInfo: any) => {
        toast.warning(errorInfo);
    };

    /**
     * Handle change
     * @param e change event
     */
    function handleChange(e: any) {
        e.preventDefault();
        setFile(e.target.files[0])
    }

    /**
     * Handle change city
     * @param e change event
     */
    function handleChangeCity(e: any) {
        setIdCity(e)

    }

    /**
     * Handle change district
     * @param e change event
     */
    function handleChangeDistrict(e: any) {
        setIdDistrict(e)
    }   

    /**
     * Handle go back to previous page
     */
    const handleBack = () => {
        history.goBack()
    }

    /**
     * Handle show district
     * @param idCity get id of city to show distinct
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
     * Handle show ward
     * @param idDistrict show ward of district
     * @returns 
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
    
    return (
        <div className="formProduct">
            <div className="formProduct__container">
                <h2 className="formProduct__title">User Profile</h2>
                <h1 style={{ borderBottom: 'solid 1px rgb(224, 215, 215)', marginBottom: '30px' }}></h1>
                <Form {...layout}
                    form={form}
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
                                rules={[
                                    {
                                        required: true
                                    },
                                    {
                                        max: 60, message: "Name max length 60 character!"
                                    }
                                    ,
                                    {
                                        whitespace: true
                                    }
                                ]}
                            >
                                <Input style={{ borderRadius: "6px", marginLeft: "5px", width: "80%" }} disabled={userId ? true : false} />
                            </Form.Item>

                            <Form.Item
                                name={['user', 'email']}
                                label="Email"
                                rules={[{ required: true },
                                {
                                    type: "email",
                                    pattern: new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"),
                                    message:
                                        'Enter a valid email address!',
                                    whitespace: false
                                },
                                {
                                    max: 64, message: "Username max length 64 character"
                                }
                                ]}
                            >
                                <Input style={{ borderRadius: "6px", marginLeft: "5px", width: "80%" }} disabled={userId ? true : false} />
                            </Form.Item>
                            <Form.Item
                                name={['user', 'firstName']}
                                label="First Name"
                                rules={[
                                    {
                                        max: 60, message: "First Name max length 60 character!"
                                    }
                                    ,
                                    {
                                        whitespace: true
                                    }
                                ]}
                            >
                                <Input style={{ borderRadius: "6px", marginLeft: "5px", width: "60%" }} />
                            </Form.Item>
                            <Form.Item
                                name={['user', 'lastName']}
                                label="Last Name"
                                rules={[
                                    {
                                        max: 60, message: "Last Name max length 60 character!"
                                    }
                                    ,
                                    {
                                        whitespace: true
                                    }
                                ]}
                            >
                                <Input style={{ borderRadius: "6px", marginLeft: "5px", width: "60%" }} />
                            </Form.Item>


                            <Form.Item
                                name={['user', 'phone']}
                                label="Phone Number"
                                rules={[
                                    {
                                        pattern: /^([0-9])\d{10}\b$/,
                                        message: "Phone number must be in the right format!"
                                    },
                                ]}
                            >
                                <InputNumber style={{ borderRadius: "6px", marginLeft: "5px", width: "80%" }} />
                            </Form.Item>
                        </div>
                        <div className="formProduct__items">

                            <Form.Item
                                name={['user', 'city']}
                                label="City"

                            >
                                <Select style={{ width: 200, marginLeft: "5px" }} onChange={handleChangeCity}>
                                    {addressVN.map((item: any) => <Option key={item.id} value={item.Name}>{item.Name}</Option>)}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name={['user', 'district']}
                                label="District"

                            >
                                <Select style={{ width: 200, marginLeft: "5px" }} onChange={handleChangeDistrict}>
                                    {idCity ? handleShowDistrict(idCity) : null}
                                </Select>
                            </Form.Item>

                            <Form.Item name={['user', 'ward']}
                                rules={[
                                    {
                                        max: 66, message: `Max length is 65 character`
                                    }
                                ]} label="Ward" >
                                <Select style={{ width: 200, marginLeft: "5px" }} >
                                    {idDistrict ? handleShowWard(idDistrict) : null}
                                </Select>
                            </Form.Item>
                            <Form.Item name={['user', 'address']}
                                rules={[

                                    {
                                        max: 65, message: `Max length is 65 character`
                                    }
                                ]} label="Address" >
                                <Input.TextArea style={{ borderRadius: "6px", marginLeft: "5px", width: "80%" }} autoSize={{ minRows: 1, maxRows: 5 }} />
                            </Form.Item>
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "left", marginLeft: "30px" }}>
                        <Button type="primary" onClick={() => history.push("/admin/user/changePassword/" + userId)} style={{ marginRight: "15px" }} size="middle" color="#d9f7be">
                            Change Your Password
                    </Button>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}> <Spin spinning={loading} indicator={antIcon} /></div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Form.Item>
                            <Button onClick={() => onReset()} style={{ marginRight: "15px", width: "5rem" }} size="middle">
                                Clear
                             </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button danger type="primary" onClick={() => handleBack()} style={{ marginRight: "15px", width: "5rem" }} size="middle" color="#d9f7be">
                                Back
                        </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ width: "5rem" }} size="middle" >
                                Submit
                        </Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </div >

    )
}

export default AdminProfile;

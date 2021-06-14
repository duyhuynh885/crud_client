import React, { useEffect, useState } from 'react';
import {
    Form,
    Input,
    Button,
    Tag,
} from 'antd';
import '../Login/Auth.css'
import { Link, useHistory, useParams } from 'react-router-dom';
import { FacebookFilled, GoogleSquareFilled, LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword, register, resetPassword } from '../../../actions/auth'
import { IUser } from '../../../interfaces';
import { clearState } from '../../../actions/products';
import { AppDispatch, RootState } from '../../../store';


/**
 * ChangePassword
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
const ChangePassword: React.FC = () => {
    /*
    *  Get state from store
    */
    const [errorMessage, setErrorMessage] = useState<String>('');
    /*
    *  Get state from store
    */
    const Success = useSelector((state: RootState) => state.isSuccess)
    const Error = useSelector((state: RootState) => state.isError)
    /*
    * Initial Something For Component 
    */
    const [form] = Form.useForm();
    const history = useHistory();
    const dispatch: AppDispatch = useDispatch();
    const { userId } = useParams<any>();
    // clear state
    useEffect(() => {
        return () => {
            dispatch(clearState());
        };
    }, []);

    const onReset = () => {
        form.resetFields();
    };

    /**
     * Load error or success message if exist
     */
    useEffect(() => {
        if (Error) {
            setErrorMessage(Error);
            dispatch(clearState());
        }
        if (Success) {
            toast.success(Success);
            dispatch(clearState());
            onReset();
            setTimeout(() => {
                history.push("/admin")
                window.location.reload();
            }, 300);
        }
    }, [Success, Error]);

    /**
     * Create or update action if submit success
     * @param values contains create or update information
     */
    const onFinish = (values: any) => {
        const { password, oldPassword } = values
        if (password && userId) {
            dispatch(changePassword(password, oldPassword, userId))
        }
    }
    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 10,
        },
    };


    return (
        <div className="changePassword">
            <div className="changePassword__card">
                <h1 className="changePassword__title">Change Password?</h1>
                <p style={{ color: 'red' }}>{errorMessage}</p>
                <Form
                    {...layout}
                    form={form}
                    name="normal_login"
                    className="login-form"
                    labelAlign="left"
                    layout="horizontal"
                    onFinish={onFinish}
                    onChange={() => { setErrorMessage('') }}
                >
                    <p>Please enter new password.</p>
                    <Form.Item
                        name={"oldPassword"}
                        label="Old Password"
                        rules={[
                            { required: true, message: 'Please input your Old Password!' },
                            {
                                min: 7, max: 15, message: "Password must be between 8 and 15 character"
                            },
                            {
                                pattern: new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"),
                                message: 'Must contain at least one number and one uppercase and lowercase letter!',
                            }
                        ]}

                        hasFeedback
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item
                        name={"password"}
                        label="New Password"
                        rules={[
                            { required: true, message: 'Please input your Password!' },
                            {
                                min: 7, max: 15, message: "Password must be between 8 and 15 character"
                            },
                            {
                                pattern: new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"),
                                message: 'Must contain at least one number and one uppercase and lowercase letter!',
                            }
                        ]}
                        hasFeedback
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item
                        name={"cfPassword"}
                        dependencies={['password']}
                        label="Confirm Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(rule: any, value: any) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('The two passwords that you entered do not match!');
                                },
                            })
                        ]}
                        hasFeedback
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder="Confirm password"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button className="login-form-forgot" style={{ marginRight: "5px" }} onClick={() => history.goBack()}>
                            Back
                         </Button>
                        <Button type="primary" htmlType="submit" className="login-form-button" >
                            Send
                        </Button >

                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};


export default ChangePassword;
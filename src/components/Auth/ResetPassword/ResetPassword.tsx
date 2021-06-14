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
import { register, resetPassword } from '../../../actions/auth'
import { IUser } from '../../../interfaces';
import { clearState } from '../../../actions/products';
import { AppDispatch, RootState } from '../../../store';
/**
 * ResetPassword
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
const ResetPassword: React.FC = () => {
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
    const { token } = useParams<any>();
    const dispatch: AppDispatch = useDispatch();
    /*
    * Initial Function For Component 
    */
    // clear state
    useEffect(() => {
        return () => {
            dispatch(clearState());
        };
    }, []);

    const onReset = () => {
        form.resetFields();
    };
    const showMessageInForm = () => {
        return <p style={{ color: 'red' }}>{errorMessage}</p>
    }
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
                history.push("/login")
                window.location.reload();
            }, 300);
        }
    }, [Success, Error]);

    /**
     * Create or update action if submit success
     * @param values contains create or update information
     */    const onFinish = (values: any) => {
        const { password } = values
        if (password) {
            dispatch(resetPassword(password, token))
        }
    }


    return (
        <div className="authForm">

            <div className="authForm__card">
                <h1 className="authForm__title">Forget Password?</h1>
                <p style={{ color: 'red' }}>{errorMessage}</p>
                <Form
                    form={form}
                    name="normal_login"
                    className="login-form"
                    labelAlign="left"
                    layout="horizontal"
                    onChange={() => { setErrorMessage('') }}
                    onFinish={onFinish}

                >
                    <p>Please enter new password.</p>
                    <Form.Item
                        name={"password"}
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
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            {
                                min: 7, max: 15, message: "Confirm password must be between 7 and 15 character"
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
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{ marginRight: "5px" }}>
                            Send
            </Button >
                        <Link className="login-form-forgot" to="/login">
                            Back To Sign In
            </Link>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};


export default ResetPassword;
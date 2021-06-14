import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Button,
  Tag,
} from 'antd';
import '../Login/Auth.css'
import { Link, Redirect, useHistory } from 'react-router-dom';
import { FacebookFilled, GoogleSquareFilled, LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../../actions/auth'
import { clearState } from '../../../actions/products';
import { isAuth } from '../../../helper/auth';
import { AppDispatch, RootState } from '../../../store';

const Register: React.FC = () => {
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
        history.push("/login")
        window.location.reload();
      }, 300);
    }
  }, [Success, Error]);

  /**
   * Create or update action if submit success
   * @param values contains create or update information
   */
  const onFinish = (values: any) => {
    const { username, email, password } = values
    if (username && email && password) {
      dispatch(register(username, email, password))
    }
  }


  return (

    <div className="authForm">
      {isAuth() ? <Redirect to='/' /> : null}
      <div className="authForm__card">
        <h1 className="authForm__title">Sign Up</h1>
        <p style={{ color: 'red' }}>{errorMessage}</p>
        <Form
          form={form}
          name="normal_login"
          className="login-form"
          labelAlign="left"
          layout="horizontal"
          onFinish={onFinish}
          onChange={() => { setErrorMessage('') }}
        >
          <Form.Item
            name={"username"}
            rules={[{
              required: true,
              message: 'Please input your Username!'
            }, {
              min: 8, max: 25, message: "Username must be between 8 and 15 character"
            },
            {
              pattern: new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+([a-zA-Z0-9-]+)*$"),
              message:
                'Enter a valid username!',
            },]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name={"email"}
            rules={[
              {
                required: true,
                message: 'Please input your Email!'
              },
              {
                type: "email",
                pattern: new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"),
                message:
                  'Enter a valid email address!',
              },
              {
                max: 64, message: "Username max length 64 character"
              }
            ]}
          >
            <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>
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
              Sign Up
            </Button >
            Or <Link to="/login">Sign In Now!</Link>
          </Form.Item>
          <Form.Item>
            <div className="authForm__social">
              <span>
                Or Sign Up With
              </span>
              <div>
                <Tag style={{ fontSize: "16px", width: "7.5rem", padding: "5px 10px" }} icon={<GoogleSquareFilled />} color="#ff4d4f">
                  Google
               </Tag>
                <Tag style={{ fontSize: "16px", width: "7.5rem", padding: "5px 10px" }} icon={<FacebookFilled />} color="#3b5999">
                  Facebook
              </Tag>
              </div>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};


export default Register;
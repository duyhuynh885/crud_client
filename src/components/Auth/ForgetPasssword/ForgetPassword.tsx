import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Button,
} from 'antd';
import '../Login/Auth.css'
import { Link, useHistory } from 'react-router-dom';
import { MailOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { sendMail } from '../../../actions/auth'
import { clearState } from '../../../actions/products';
import { AppDispatch, RootState } from '../../../store';


const ForgetPassword: React.FC = () => {
  /*
  * Initial State For Component 
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
  const dispatch: AppDispatch = useDispatch();
  const [form] = Form.useForm();

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


  /**
   * Load error or success message if exist
   */
  useEffect(() => {
    if (Error) {
      setErrorMessage(Error)
      dispatch(clearState());
    }
    if (Success) {
      toast.success(Success);
      dispatch(clearState());
      onReset();
    }
  }, [Success, Error]);

  /**
   * Create or update action if submit success
   * @param values contains create or update information
   */
  const onFinish = (values: any) => {
    const { email, } = values
    if (email) {
      dispatch(sendMail(email));
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
          onFinish={onFinish}
          onChange={() => { setErrorMessage('') }}
        >
          <p>Please enter email to send link reset password.</p>
          <Form.Item
            name={"email"}
            rules={[
              {
                required: true, message: "Email is required!"
              }
            ]}
          >
            <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" style={{ marginRight: "5px" }}>
              Send
            </Button>
            <Link className="login-form-forgot" to="/login">
              Back To Sign In
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};


export default ForgetPassword;
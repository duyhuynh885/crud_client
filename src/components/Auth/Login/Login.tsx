import { Form, Input, Button, Checkbox, Tag } from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined, FacebookOutlined, FacebookFilled, GoogleSquareFilled } from '@ant-design/icons';
import { Link, Redirect, useHistory } from 'react-router-dom';
import './Auth.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { clearState } from '../../../actions/products';
import { toast } from 'react-toastify';
import { login } from '../../../actions/auth';
import { isAuth } from '../../../helper/auth';
import { validateMessages } from '../../../constants/messages';
import { AppDispatch, RootState } from '../../../store';

const Login: React.FC = () => {
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


  /**
   * Create or update action if submit success
   * @param values contains create or update information
   */
  const onFinish = (values: any) => {
    const { username, password } = values
    if (username && password) {
      dispatch(login(username, password))
    }
  };

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
      isAuth() && isAuth().roles[0] === 'ROLE_ADMIN'
        ? history.push('/admin')
        : history.push('/');
      toast.info("Welcome back " + isAuth().username + "!");
      dispatch(clearState());
      onReset();
    }
  }, [Success, Error]);

  return (
    <div className="authForm">
      {isAuth() ? <Redirect to='/' /> : null}
      <div className="authForm__card">
        <h1 className="authForm__title">Sign In</h1>
        <p style={{ color: 'red' }}>{errorMessage}</p>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          labelAlign="left"
          form={form}
          onChange={() => { setErrorMessage('') }}
          validateMessages={validateMessages}
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: "Username is required!" }
            ]}

          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Password is required!" }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Link className="login-form-forgot" to="/forget-password">
              Forgot password
            </Link>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" style={{ marginRight: "5px" }}>
              Sign In
        </Button >
        Or <Link to="/register">Register Now!</Link>
          </Form.Item>
          <Form.Item>
            <div className="authForm__social">
              <span>
                Or Sign In With
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
    </div >

  );
};

export default Login
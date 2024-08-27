import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Button, message } from 'antd';

import * as authService from '@/auth';
import { login } from '@/redux/auth/actions';
import { selectAuth } from '@/redux/auth/selectors';
import useLanguage from '@/locale/useLanguage';
import errorHandler from '@/request/errorHandler';
import successHandler from '@/request/successHandler';

import Loading from '@/components/Loading';
import AuthModule from '@/modules/AuthModule';
import LoginForm from '@/forms/LoginForm';
import OTPForm from '@/forms/OtpForm';

const LoginPage = () => {
  const [loginData, setLoginData] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [userData, setUserData] = useState(null);
  
  const { isLoading, isSuccess } = useSelector(selectAuth);
  const translate = useLanguage();
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      const data = await authService.login({ loginData: values });
      setLoginData(values);

      if (data.success) {
        setUserData(values);
        setShowLogin(false);
        sendOtp(values.email);
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const sendOtp = async (email) => {
    try {
      const responseData = await authService.requestOtp({ loginData: { email } });
      // successHandler(responseData, {
      //   notifyOnSuccess: true,
      //   notifyOnFailed: true,
      // });
      message.success('OTP Sent');
    } catch (error) {
      errorHandler(error);
    }
  };

  useEffect(() => {
    if (isSuccess) setShowLogin(false);
  }, [isSuccess]);

  return (
    <AuthModule authContent={
      <Loading isLoading={isLoading}>
        {showLogin ? (
          <Form layout="vertical" onFinish={handleLogin}>
            <LoginForm />
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={isLoading}
                size="large"
              >
                {translate('Log in')}
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <OTPForm userData={userData} />
        )}
      </Loading>
    } AUTH_TITLE="Sign in" />
  );
};

export default LoginPage;

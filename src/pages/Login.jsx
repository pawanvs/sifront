import { useEffect, useState } from 'react';
import * as authService from '@/auth';

import axios from 'axios';
import { API_BASE_URL } from '@/config/serverApiConfig';
import errorHandler from '@/request/errorHandler';
import successHandler from '@/request/successHandler';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useLanguage from '@/locale/useLanguage';

import { Form, Button, Input , message} from 'antd';

import { login } from '@/redux/auth/actions';
import { selectAuth } from '@/redux/auth/selectors';
import LoginForm from '@/forms/LoginForm';
import OTPForm from '@/forms/OtpForm';
import Loading from '@/components/Loading';
import AuthModule from '@/modules/AuthModule';

const LoginPage = () => {
 
  const [loginData, setLoginData] = useState('');
  const [showLogin, setShowLogin] = useState(true);
  const translate = useLanguage();
  const { isLoading, isSuccess } = useSelector(selectAuth);
  const [userData, setUserData] = useState('');
  const navigate = useNavigate();
  // const size = useSize();

  const onFinish = async (values) => {

    const data = await authService.login({ loginData: values });

    setLoginData(values);

    if (data.success === true) {

      setUserData(values);

      setShowLogin(false);
      sendOtp(values.email);

    }else{
      console.log("login verified");

      setShowLogin(true);
     

    }

  };

  useEffect(() => {
    //if (isSuccess) navigate('/');

    if (isSuccess) setOtp(true);

  }, [isSuccess]);

  const sendOtp = async (email) => {
   
    try {
      
      try{
        const responseData = await authService.requestOtp({ loginData: { 'email': email } });
        successHandler(responseData, {
          notifyOnSuccess: true,
          notifyOnFailed: true,
        });

      }catch(error){

      }
  
      message.success('OTP Sent');
      setIsOtpSent(true);
      setIsResendDisabled(true);
      //startCountdown();
      
    } catch (error) {
      console.log(error)
      return errorHandler(error);

    }
 
  };

  const FormContainer = () => {
    return (

      <>

        <Loading isLoading={isLoading}>
         {showLogin && <Form
            layout="vertical"
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
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
          </Form>} 

        {!showLogin &&  <OTPForm  userData={userData}/>}
        </Loading>
      </>

    );
  };

  return (<>

    {/* <OtpContainer/> */}
    <AuthModule authContent={<FormContainer />} AUTH_TITLE="Sign in" />

  </>);
};

export default LoginPage;

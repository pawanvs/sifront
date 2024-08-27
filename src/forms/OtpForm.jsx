import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';

import * as authService from '@/auth';

import axios from 'axios';
import { API_BASE_URL } from '@/config/serverApiConfig';
import errorHandler from '@/request/errorHandler';
import successHandler from '@/request/successHandler';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useLanguage from '@/locale/useLanguage';


import { login } from '@/redux/auth/actions';
import { selectAuth } from '@/redux/auth/selectors';
import LoginForm from '@/forms/LoginForm';
import OTPForm from '@/forms/OtpForm';
import Loading from '@/components/Loading';
import AuthModule from '@/modules/AuthModule';

const MyForm = ({userData}) => {
 
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(0);
  const [canResend, setCanResend] = useState(true);
  const [isOtpSent, setIsOtpSent] = useState(false);

  const dispatch = useDispatch();

  const generateOtp = () => {
    // Your OTP generation logic here
    sendOtp();
    message.success('OTP generated and sent to your email/phone');
    setCanResend(false);
    setTimer(30 ); // 30 minutes in seconds
  };

  const resendOtp = () => {
    if (canResend) {
      generateOtp();
    }
  };

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const sendOtp = async () => {
   
    try {
      
      try{
        const responseData = await authService.requestOtp({ loginData: { 'email': 'ranganath.cse@gmail.com' } });
        
        // successHandler(responseData, {
        //   notifyOnSuccess: true,
        //   notifyOnFailed: true,
        // });

      }catch(error){

      }
  
      message.success('OTP Sent');
      setIsOtpSent(true);
      //setIsResendDisabled(true);
      //startCountdown();
      
    } catch (error) {
      console.log(error)
      return errorHandler(error);

    }
 
  };

  const handleSubmit = async (values) => {



    try{
      const responseData = await authService.verifyOtp({ loginData: { 'email': userData.email , otp: otp } });
      
    if(responseData.success){
      message.success('OTP  verfied');
      dispatch(login({ loginData: userData }));
    }else{

      message.error('OTP Not verfied');
    }
     

    }catch(error){

    }

   
  };
 

  return (
    <div style={{ maxWidth: '300px', margin: '0 auto', padding: '20px', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
      <h2>OTP Verification</h2>
      <Form onFinish={handleSubmit}>
        <Form.Item
          name="otp"
          rules={[{ required: true, message: 'Please input your OTP!' }]}
        >
          <Input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Verify
          </Button>
        </Form.Item>
      </Form>
      <Button
        type="default"
        onClick={resendOtp}
        disabled={!canResend}
      >
        Resend OTP {canResend ? '' : `(${Math.floor(timer / 60)}:${String(timer % 60).padStart(2, '0')})`}
      </Button>
    </div>
  );  
};

export default MyForm;

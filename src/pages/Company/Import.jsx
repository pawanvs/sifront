import React, { useState } from 'react';
import { Upload, Button, message, Result, Input, Form, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { API_BASE_URL } from '@/config/serverApiConfig';

import useLanguage from '@/locale/useLanguage';

import { request } from '@/request';

const ImportCompany = () => {
  const translate = useLanguage();
  const [fileList, setFileList] = useState([]);
  
  const [customerType, setCustomerType] = useState('');


  const handleSubmit = async () => {
    if (!fileList) {
      message.error('Please upload a file.');
      return;
    }
    if (!customerType) {
      message.error('Please enter a customerType.');
      return;
    }
    // Handle form submission, e.g., send to server
    console.log('File:', fileList);
    console.log('Description:', customerType);
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('file', file.originFileObj);
    });

    formData.append('customerType',customerType)

    try {

      //request.upload({entity : 'invoice', id: '1', jsonData : formData})

      const response = await fetch(`${API_BASE_URL}` + 'cimport', {
        method: 'PATCH',
        body: formData,
        credentials: 'include'
      });

      // request.upload({entity : 'invoice', id: '1', jsonData : formData})

      if (response.ok) {
        message.success('Upload successful');
      } else {
        message.error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      message.error('Upload failed');
    }
    message.success('File and customerType submitted successfully!');
  };

  const handleChange = (info) => {
    let fileList = [...info.fileList];

    // Limit the number of uploaded files
    fileList = fileList.slice(-1);

    // Update state
    setFileList(fileList);
  };

  return (
    <Result
      subTitle={translate('Campany Data')}
      extra={
        <>
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item label="Upload File">
              <Upload fileList={fileList} onChange={handleChange} beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>Select Excel File</Button>
              </Upload>
            </Form.Item>
            <Form.Item label="Customer Type">
              <Select
                value={customerType}
                onChange={(value) => setCustomerType(value)}
                placeholder="Select a customerType"
              >
                <Select.Option value="Dealer">Dealer</Select.Option>
                <Select.Option value="People">People</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Upload
              </Button>
            </Form.Item>
          </Form>
        </>
      }
    />
  );
};

export default ImportCompany;
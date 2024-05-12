import React, { useState } from 'react';
import { Upload, Button, message, Result } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { API_BASE_URL } from '@/config/serverApiConfig';

import useLanguage from '@/locale/useLanguage';

const ImportCompany = () => {
  const translate = useLanguage();
  const [fileList, setFileList] = useState([]);

  const handleChange = (info) => {
    let fileList = [...info.fileList];

    // Limit the number of uploaded files
    fileList = fileList.slice(-1);

    // Update state
    setFileList(fileList);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('file', file.originFileObj);
    });

    try {
      const response = await fetch(`${API_BASE_URL}` + 'import', {
        method: 'PATCH',
        body: formData,
        credentials: 'include'
      });

      if (response.ok) {
        message.success('Upload successful');
      } else {
        message.error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      message.error('Upload failed');
    }
  };
  return (
    <Result
     
      subTitle={'Company  Bulk Import'}
      extra={
        <>
          <div>
            <Upload fileList={fileList} onChange={handleChange} beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Select Excel File</Button>
            </Upload>
            <Button type="primary" onClick={handleUpload} disabled={fileList.length === 0}>
              Upload
            </Button>
          </div>
        </>
      }
    />
  );
};

export default ImportCompany;
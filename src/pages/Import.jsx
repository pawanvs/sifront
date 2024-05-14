import React, { useState } from 'react';
import { Upload, Button, message, Result, Tabs } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
import ImportCompany from './Company/Import';
import ImportInvoice from './Invoice/Import';

import ImportOpemInvoice from './Invoice/ImportOpen';

import { API_BASE_URL } from '@/config/serverApiConfig';

import useLanguage from '@/locale/useLanguage';

const Import = () => {
  const translate = useLanguage();
  const [fileList, setFileList] = useState([]);
  function callback(key) {
    console.log(key);
  }

  const handleChange = (info) => {
    let fileList = [...info.fileList];

    // Limit the number of uploaded files
    fileList = fileList.slice(-1);

    // Update state
    setFileList(fileList);
  };

  return (
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab="Invoice data" key="1">
      <ImportInvoice />
      </TabPane>
      <TabPane tab="Open Invoice data" key="2">
      <ImportOpemInvoice />

      
      </TabPane>
      <TabPane tab="Company Data" key="3">
        <ImportCompany />
      </TabPane>
     
    </Tabs>
    
  );
};

export default Import;

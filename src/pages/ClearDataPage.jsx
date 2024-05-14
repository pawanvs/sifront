import React, { useState } from 'react';
import { Button, Modal, message } from 'antd';


import axios from 'axios';
import { API_BASE_URL } from '@/config/serverApiConfig';


axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true;

const ClearDataPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // Replace this URL with the actual API endpoint to clear data
    const apiUrl = `${API_BASE_URL}setting/removeData`;
    axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        message.success('Website data cleared successfully.');
        setIsModalVisible(false);
      })
      .catch(error => {
        console.error('Error:', error);
        message.error('An error occurred while clearing data.');
      });

  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Clear Website Data</h1>
      <p>Click the button below to clear all website data.</p>
      <Button type="primary" onClick={showModal}>
        Clear Data
      </Button>
      <Modal
        title="Warning"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Yes, Clear Data"
        cancelText="Cancel"
      >
        <p>Are you sure you want to clear all website data? This action cannot be undone.</p>
      </Modal>
    </div>
  );
};

export default ClearDataPage;

import React, { useState, useEffect } from 'react';
import { request } from '@/request';
import { Table, Spin, Alert } from 'antd';

const columns = [
  {
    title: "Invoice Number",
    dataIndex: "InvoiceNumber",
    key: 'InvoiceNumber'
  },
  {
    title: "Content",
    dataIndex: "content",
    key: 'content'
  }
];

const NoteDataTable = ({ invoiceNumber }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          filter: 'InvoiceNumber',
          equal: invoiceNumber
        };
        const { result } = await request.filter({ entity: 'note', options });
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [invoiceNumber]);

  if (loading) return <Spin size="large" />;
  if (error) return <Alert message="Error" description={error.message} type="error" showIcon />;

  return <Table dataSource={data} columns={columns} rowKey="id" />;
};

const NotesTable = ({ invoiceNumber }) => (
  <div>
    <h2>Previous Notes</h2>
    <NoteDataTable invoiceNumber={invoiceNumber} />
  </div>
);

export default NotesTable;
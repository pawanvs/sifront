import React, { useState, useEffect } from 'react';
import { request } from '@/request';
import Invoice from './Invoice';
import { Table } from 'antd';


 const NoteDataTable = ({invoiceNumber}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    
  const fetchData = async () => {
    try {
      let jsonData = await request.list({ entity: 'note' });
      
      let filteredData = jsonData.result.filter((item) => {

          return invoiceNumber == item.InvoiceNumber;

      });
      [].filter
      setData(filteredData);
      
      console.log("Filter",filteredData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const columns=[
    {
      'title':"Invoice Number",
      'dataIndex':"InvoiceNumber",
      key:'InvoiceNumber'
    },
    {
      'title':"Content",
      'dataIndex':"content",
      key:'content'
    }

  ];
  return (
    <Table dataSource={data} columns={columns} />
  );
};

const  NotesTable = ({invoiceNumber}) => {
   
    
  return (
    <div>
      <h2>Previous Notes</h2>
        <NoteDataTable invoiceNumber = {invoiceNumber}/>
    </div>
  );
};


export default NotesTable;


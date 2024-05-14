import { EllipsisOutlined, PlusOutlined, ExportOutlined } from '@ant-design/icons';
import { useRef , useState} from 'react';
import { Button, DatePicker, Space, Table, Dropdown, Tag , Modal } from 'antd';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { request } from '@/request';
import dayjs from 'dayjs';
import * as XLSX from 'xlsx';
import { useMoney, useDate } from '@/settings';
import axios from 'axios';
import { API_BASE_URL } from '@/config/serverApiConfig';

import errorHandler from '@/request/errorHandler';
import successHandler from '@/request/successHandler';

axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true;



export const waitTimePromise = async (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time = 100) => {
  await waitTimePromise(time);
};
const DeleteButton = ({ record, onDelete }) => {
  const handleDelete = () => {
    Modal.confirm({
      title: 'Confirm Delete',
      content: `Are you sure you want to delete ${record.client.name}?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        // onDelete(record.key);
        console.log(record);
      },
    });
  };

  return <Button onClick={handleDelete}>Delete</Button>;
};

//record
export default () => {
  const actionRef = useRef();
  const { moneyFormatter } = useMoney();
  const { dateFormat } = useDate();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  // Handle row selection
  const onSelectChange = selectedRowKeys => {
    setSelectedRowKeys(selectedRowKeys);
  };

  // Handle row selection
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // Handle delete button click
  const handleDelete = () => {
    // Filter out selected rows
    

    console.log(selectedRowKeys);
    // Update table data
    // dataSource.splice(0, dataSource.length, ...newData);
    // Clear selected row keys
    setSelectedRowKeys([]);
  };
  const columns = [
    
    {
      title: 'Number',
      dataIndex: 'number',
      ellipsis: true,
      tooltip: 'The title will automatically collapse if too long'
      
    },
    {
      title: 'Name',
      dataIndex: 'name',
      ellipsis: true,
      tooltip: 'The title will automatically collapse if too long',
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'This field is required',
          },
        ],
      },
      render: (_, record) => (
        <Space>
          {record.name}
        </Space>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      ellipsis: true,
      tooltip: 'The title will automatically collapse if too long'
      
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      ellipsis: true,
      tooltip: 'The title will automatically collapse if too long'
      
    },
    {
      title: 'CC Name',
      dataIndex: 'name_on_card',
      ellipsis: true,
      tooltip: 'The title will automatically collapse if too long'
      
    },

    {
      title: 'Expire',
      dataIndex: 'expire',
      ellipsis: true,
      tooltip: 'The title will automatically collapse if too long'
      
    },

    {
      title: 'Card Type',
      dataIndex: 'card_type',
      ellipsis: true,
      tooltip: 'The title will automatically collapse if too long'
      
    },
    {
      title: 'Card Number',
      dataIndex: 'card_number',
      ellipsis: true,
      render: (_, record) => (
        <Space>
          {record.payment?.card_number}
        </Space>
      ),
      
    },
    
  ];
  return (
    <>
    <ProTable
      columns={columns}
      actionRef={actionRef}
      rowSelection={{
        selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
        selectedRowKeys,
        onChange: onSelectChange,
        
      }}
      cardBordered
      //Data loading is handeled here
      request={async (params, sort, filter) => {
        console.log(params,sort, filter);
       
      const options = {page : params.current, items : params.pageSize}
      let resdata  = await request.list({ entity : 'company', options });

         return { page : resdata.pagination.page , success : resdata.success , total : resdata.pagination.count , data : resdata.result}
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        defaultValue: {
          option: { fixed: 'right', disable: true },
        },
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="_id"
      search={{
        labelWidth: 'auto',
      }}
      
      form={{
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 10,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="Customer List"
      toolBarRender={() => [
        <>
         <Button
          key="button"
          icon={<ExportOutlined />}
          onClick={() => {
            //actionRef.current?.reload();
            const fetchData = async () => {
              let jsonData ;
              try {
                try {
                  const response = await axios.get('expiredData');
                  successHandler(response, {
                    notifyOnSuccess: false,
                    notifyOnFailed: true,
                  });
                  jsonData =  response.data;
                } catch (error) {
                  return errorHandler(error);
                }
                let et = jsonData.result.map((item)=> {

                  return {"Customer Number" : item.number , "Customer Name" :  item.name , 'Expire' : item.payment.expire , 'Card Number' : item.payment.card_number, "Card Type" : item.payment.card_type};

                })

                const worksheet = XLSX.utils.json_to_sheet(et);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
                XLSX.writeFile(workbook, 'customer_detail.xlsx');
              } catch (error) {
                console.error('Error fetching data:', error);
              }
            };
          
            const exportToExcel = () => {
              const worksheet = XLSX.utils.json_to_sheet(data);
              const workbook = XLSX.utils.book_new();
              XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
              XLSX.writeFile(workbook, 'data.xlsx');
            };

            fetchData();
          }}
          type="primary"
        >
          Export Expired
        </Button>
        <Button
          key="button"
          icon={<ExportOutlined />}
          onClick={() => {
            //actionRef.current?.reload();
            const fetchData = async () => {
              let jsonData ;
              try {
                try {
                  // const response = await axios.get('expiredData');
                  let response  = await request.listAll({ entity : 'company' });
                  
                  jsonData =  response;
                } catch (error) {
                  return errorHandler(error);
                }
                let et = jsonData.result.map((item)=> {

                  return {"Customer Number" : item.number , "Customer Name" :  item.name , 'Expire' : item.payment.expire , 'Card Number' : item.payment.card_number, "Card Type" : item.payment.card_type};

                })

                const worksheet = XLSX.utils.json_to_sheet(et);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
                XLSX.writeFile(workbook, 'customer_detail.xlsx');
              } catch (error) {
                console.error('Error fetching data:', error);
              }
            };
          
            const exportToExcel = () => {
              const worksheet = XLSX.utils.json_to_sheet(data);
              const workbook = XLSX.utils.book_new();
              XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
              XLSX.writeFile(workbook, 'data.xlsx');
            };

            fetchData();
          }}
          type="primary"
        >
          Export All
        </Button>,
       
       
        </>
        
       ,
      ]}
    />
    </>
  );
};

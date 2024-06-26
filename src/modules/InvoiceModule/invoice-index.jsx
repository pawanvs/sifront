import { EllipsisOutlined, PlusOutlined, ExportOutlined } from '@ant-design/icons';
import { useRef , useState} from 'react';
import { Button, DatePicker, Space, Table, Dropdown, Tag , Modal } from 'antd';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { request } from '@/request';
import dayjs from 'dayjs';
import * as XLSX from 'xlsx';
import { useMoney, useDate } from '@/settings';

import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
dayjs.extend(timezone)

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
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: 'Invoice Number',
      dataIndex: 'number',
      
      
    },
    //dayjs(date).format(dateFormat);
    {
      title: 'Invoice Date',
      dataIndex: 'date',
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
          {/* {record.date} */}
          
          {dayjs(dayjs.tz(record.date, "America/Toronto")).format("MM/DD/YY")}
        </Space>
      ),
    },
    {
      title: 'Customer Number',
      dataIndex: 'client',
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
          {record.client?.company.number}
        </Space>
      ),
    },

    {
      title: 'Customer Name',
      dataIndex: 'client',
      copyable: true,
      ellipsis: true,
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
          {record.client?.name}
        </Space>
      ),
    },



    {
      title: 'Invoice Amount ',
      dataIndex: 'client',
      copyable: true,
      ellipsis: true,
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
          
          {moneyFormatter({ amount: record.total, currency_code: record.currency })}
        </Space>
      ),
    },
    
    {
      title: 'Payment Method',
      dataIndex: 'client',
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
          {record.client?.company?.card_type}
        </Space>
      ),
    },
    
  ];
  return (
    <>
      {/* <Button type="primary" onClick={handleDelete} disabled={selectedRowKeys.length === 0}>
          Delete Selected Rows
        </Button> */}
    <ProTable
      columns={columns}
      // actionRef={actionRef}
      rowSelection={{
        selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
        selectedRowKeys,
        onChange: onSelectChange,
        
      }}
      
      //Data loading is handeled here
      request={async (params, sort, filter) => {
        console.log(params,sort, filter);
       
      const options = {page : params.current, items : params.pageSize}
      let resdata  = await request.list({ entity : 'invoice', options });

          return { page : resdata.pagination.page , success : resdata.success , total : resdata.pagination.count , data : resdata.result}
      }}
     
      rowKey="_id"
     
      pagination={{
        pageSize: 10,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="Invoice List"
      toolBarRender={() => [
       
         <Button
         key="button"
         icon={<ExportOutlined />}
         onClick={() => {
           //actionRef.current?.reload();
           const fetchData = async () => {
             try {
               //const response = await fetch('YOUR_API_ENDPOINT');
               let jsonData  = await request.listAll({ entity : 'invoice' });

               let et = jsonData.result.map((item)=> {

                
                return {"Invoice Number" : item.number , "Invoice Date" :  item.date , 'Invoice Amount ' : item.total, 
                'Customer Number' : item.client?.number , 'Customer Name' : item.client?.name, 
                
                "Phone" : item.client?.company.phone, "Email" : item.client?.company.email, "Card Type" : item.client?.company.card_type,
                 "Expire Date" : item.client?.company.expire, "Description" : item.description};
                 
               })

               const worksheet = XLSX.utils.json_to_sheet(et);
               const workbook = XLSX.utils.book_new();
               XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
               XLSX.writeFile(workbook, 'invoice.xlsx');
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
         Export 
       </Button>
       ,
      ]}
    />
    </>
  );
};

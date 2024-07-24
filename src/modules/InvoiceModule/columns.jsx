export const columns = [
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
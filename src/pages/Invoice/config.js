export const dataTableColumns = [
  {
    title: translate('Number'),
    dataIndex: 'number',
  },
  {
    title: translate('Client'),
    dataIndex: ['client', 'name'],
  },
  {
    title: translate('Date'),
    dataIndex: 'date',
    render: (date) => {
      return dayjs(date).format(dateFormat);
    },
  },
  {
    title: translate('expired Date'),
    dataIndex: 'expiredDate',
    render: (date) => {
      return dayjs(date).format(dateFormat);
    },
  },
  {
    title: translate('Total'),
    dataIndex: 'total',
    onCell: () => {
      return {
        style: {
          textAlign: 'right',
          whiteSpace: 'nowrap',
          direction: 'ltr',
        },
      };
    },
    render: (total, record) => {
      return moneyFormatter({ amount: total, currency_code: record.currency });
    },
  },
  {
    title: translate('paid'),
    dataIndex: 'credit',
    onCell: () => {
      return {
        style: {
          textAlign: 'right',
          whiteSpace: 'nowrap',
          direction: 'ltr',
        },
      };
    },
    render: (total, record) => moneyFormatter({ amount: total, currency_code: record.currency }),
  },
  {
    title: translate('Status'),
    dataIndex: 'status',
    render: (status) => {
      let tagStatus = tagColor(status);

      return (
        <Tag color={tagStatus.color}>
          {/* {tagStatus.icon + ' '} */}
          {status && translate(tagStatus.label)}
        </Tag>
      );
    },
  },
  {
    title: translate('Payment'),
    dataIndex: 'paymentStatus',
    render: (paymentStatus) => {
      let tagStatus = tagColor(paymentStatus);

      return (
        <Tag color={tagStatus.color}>
          {/* {tagStatus.icon + ' '} */}
          {paymentStatus && translate(paymentStatus)}
        </Tag>
      );
    },
  },
  {
    title: translate('Created By'),
    dataIndex: ['createdBy', 'name'],
  },
];

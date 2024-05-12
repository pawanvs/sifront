
import { ProTable } from '@ant-design/pro-components';
import { Button, DatePicker, Space, Table } from 'antd';

const { RangePicker } = DatePicker;

const valueEnum = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};

const ProcessMap = {
  close: 'normal',
  running: 'active',
  online: 'success',
  error: 'exception',
};

const tableListDataSource = [];

const creators = ['Fu XiaoXiao', 'Qu LiLi', 'Lin DongDong', 'Chen ShuaiShuai', 'Jian MoMo'];

for (let i = 0; i < 50; i += 1) {
  tableListDataSource.push({
    key: i,
    name: 'AppName-' + i,
    containers: Math.floor(Math.random() * 20),
    callNumber: Math.floor(Math.random() * 2000),
    progress: Math.ceil(Math.random() * 100) + 1,
    creator: creators[Math.floor(Math.random() * creators.length)],
    status: valueEnum[((Math.floor(Math.random() * 10) % 4) + '')],
    createdAt: Date.now() - Math.floor(Math.random() * 100000),
    memo:
      i % 2 === 1
        ? 'A very long memo to display but leave a tail'
        : 'Short memo text',
  });
}


const columns = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: 'Title',
    dataIndex: 'title',
    copyable: true,
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
  }]

const columns1 = [
  {
    title: 'App Name',
    width: 120,
    dataIndex: 'name',
    fixed: 'left',
    render: (_) => <a>{_}</a>,
  },
  {
    title: 'Container Count',
    width: 120,
    dataIndex: 'containers',
    align: 'right',
    search: false,
    sorter: (a, b) => a.containers - b.containers,
  },
  {
    title: 'Call Count',
    width: 120,
    align: 'right',
    dataIndex: 'callNumber',
  },
  {
    title: 'Progress',
    dataIndex: 'progress',
    valueType: (item) => ({
      type: 'progress',
      status: ProcessMap[item.status],
    }),
  },
  {
    title: 'Creator',
    width: 120,
    dataIndex: 'creator',
    valueType: 'select',
    valueEnum: {
      all: { text: 'All' },
      'Fu XiaoXiao': { text: 'Fu XiaoXiao' },
      'Qu LiLi': { text: 'Qu LiLi' },
      'Lin DongDong': { text: 'Lin DongDong' },
      'Chen ShuaiShuai': { text: 'Chen ShuaiShuai' },
      'Jian MoMo': { text: 'Jian MoMo' },
    },
  },
  {
    title: 'Creation Time',
    width: 140,
    key: 'since',
    dataIndex: 'createdAt',
    valueType: 'date',
    sorter: (a, b) => a.createdAt - b.createdAt,
    renderFormItem: () => {
      return <RangePicker />;
    },
  },
  {
    title: 'Memo',
    dataIndex: 'memo',
    ellipsis: true,
    copyable: true,
    search: false,
  },
  {
    title: 'Action',
    width: 80,
    key: 'option',
    valueType: 'option',
    fixed: 'right',
    render: () => [<a key="link">Link</a>],
  },
];

export default () => {
  return (
    
    <ProTable
      columns={columns}
      rowSelection={{
        selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
        defaultSelectedRowKeys: [1],
      }}
      
      scroll={{ x: 1300 }}
      options={false}
      search={false}
      pagination={{
        pageSize: 5,
      }}
      rowKey="key"
      headerTitle="Bulk Operations"
      toolBarRender={() => [<Button key="show">View Logs</Button>]}
    />
    
  );
};

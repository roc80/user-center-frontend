import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef } from 'react';
import request from 'umi-request';

export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

const columns: ProColumns<API.CurrentUser>[] = [
  {
    title: 'id',
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '头像',
    dataIndex: 'avatarUrl',
    render: (_, record) => (
      // 默认展示的图片
      <img
        key={record.id}
        src={record.avatarUrl}
        alt="avatar"
        style={{
          width: 32,
          height: 32,
          borderRadius: 16,
        }}
      />
    ),
  },
  {
    title: '用户名',
    dataIndex: 'userName',
    render(_, record) {
      if (record.userName.length > 20) {
        return record.userName.slice(0, 20) + '...';
      } else {
        return record.userName;
      }
    },
  },
  {
    title: '性别',
    dataIndex: 'gender',
    filters: true,
    onFilter: true,
    valueType: 'select',
    valueEnum: {
      0: '男',
      1: '女',
    },
    render(_, record) {
      if (record.gender === 0) {
        return <span style={{ color: 'blue' }}>♂</span>;
      } else if (record.gender === 1) {
        return <span style={{ color: 'red' }}>♀</span>;
      } else {
        return '---';
      }
    },
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    copyable: true,
    render(_, record) {
      // 长度限制
      if (record.email) {
        return record.email.length > 20 ? record.email.slice(0, 20) + '...' : record.email;
      }
      return '---';
    },
  },
  {
    title: '手机号码',
    dataIndex: 'phone',
    copyable: true,
    render(_, record) {
      // 格式化手机号码为 111-2222-3333 的格式
      if (record.phone) {
        return record.phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
      }
      return '---';
    },
  },
  {
    title: '身份',
    dataIndex: 'userRole',
    filters: true,
    onFilter: true,
    valueType: 'select',
    valueEnum: {
      0: 'Default',
      1: 'Admin',
    },
    render(_, record) {
      if (record.userRole === 1) {
        return <span style={{ color: 'green' }}>Admin</span>;
      } else {
        return <span style={{ color: 'grey' }}>Default</span>;
      }
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createDatetime',
    valueType: 'date',
    sorter: true,
  },
  {
    title: '状态',
    dataIndex: 'isValid',
    filters: true,
    onFilter: true,
    valueType: 'select',
    valueEnum: {
      0: 'Available',
      1: 'Banned',
    },
    render(_, record) {
      if (record.isValid === 1) {
        return <span style={{ color: 'red' }}>Banned</span>;
      } else {
        return <span>Available</span>;
      }
    },
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<API.CurrentUser | any>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sort, filter) => {
        console.log(sort, filter);
        await waitTime(2000);
        return request<API.BaseResponse<API.CurrentUser[]>>('/api/user/search/all', {
          params,
        });
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
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="用户管理"
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined />}
          onClick={() => {
            actionRef.current?.reload();
          }}
          type="primary"
        >
          新建
        </Button>,
      ]}
    />
  );
};

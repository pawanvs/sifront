import React, { useState } from 'react';
import { Drawer, Button, Form, Input, Checkbox, Space, message } from 'antd';
import request from '@/request/request';


const modules = [
  'DashboardModule',
  'CustomerModule',
  'OpenInvoiceModule',
  'CompanyModule',
  'InvoiceModule',
  'SettingsModule'
];

const CreateRoleDrawer = ({ open, onClose }) => {
  const [roleName, setRoleName] = useState('');
  const [permissions, setPermissions] = useState(
    modules.reduce((acc, module) => ({ ...acc, [module]: false }), {})
  );

  const handlePermissionChange = (module, value) => {
    setPermissions({
      ...permissions,
      [module]: value
    });
  };

  const createRole = async () => {
    try {
      await request.create({
        entity: 'role',
        jsonData: {
          name: roleName,
          permissions
        }
      });
      message.success(`Role ${roleName} created successfully!`);
      onClose();
    } catch (error) {
      message.error('Error creating role.');
    }
  };

  return (
    <Drawer
      title="Create New Role"
      width={400}
      onClose={onClose}
      open={open}
      className="create-role-drawer"
      footer={
        <div className="create-role-drawer-footer">
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button onClick={createRole} type="primary">
            Create Role
          </Button>
        </div>
      }
    >
      <Form layout="vertical">
        <Form.Item label="Role Name:">
          <Input
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Permissions">
          <Space direction="vertical">
            {modules.map((module) => (
              <Checkbox
                key={module}
                checked={permissions[module]}
                onChange={(e) => handlePermissionChange(module, e.target.checked)}
              >
                {module}
              </Checkbox>
            ))}
          </Space>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default CreateRoleDrawer;

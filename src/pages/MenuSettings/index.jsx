import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import CreateRoleDrawer from './CreateRoleDrawer';
import request from '@/request/request';
import useLanguage from '@/locale/useLanguage';

const MenuSettingsPage = () => {
    const translate = useLanguage();
    const [roles, setRoles] = useState(['owner', 'admin', 'manager']);
    const [permissions, setPermissions] = useState({});
    const [selectedRole, setSelectedRole] = useState('owner');
    const [open, setOpen] = useState(false);
    const [id, setId] = useState('');

    useEffect(() => {
        fetchPermissions(selectedRole);
    }, [selectedRole]);

    const fetchPermissions = async (role) => {
        const response = await request.read({ entity: "role", id: role });
        setId(response.result._id);
        setPermissions(response.result.permissions);
    };

    const handlePermissionChange = (menu, value) => {
        setPermissions({
            ...permissions,
            [menu]: value,
        });
    };

    const onClose = () => {
        setOpen(false);
    };

    const savePermissions = async () => {
        await request.update({
            entity: 'role', id, jsonData: {
                name: selectedRole,
                permissions
            }
        });
    };

    return (
        <div className="menu-settings-container">
            <div className="menu-settings-header">
                <h1 className="menu-settings-title">Menu Settings</h1>
            </div>
            <CreateRoleDrawer open={open} onClose={onClose} />
            <div className="menu-settings-content">
                <select
                    className="menu-settings-role-selector"
                    onChange={(e) => setSelectedRole(e.target.value)}
                    value={selectedRole}
                >
                    {roles.map(role => (
                        <option key={role} value={role}>{role}</option>
                    ))}
                </select>
                <div className="menu-settings-permissions">
                    {Object.keys(permissions).map(menu => (
                        <div key={menu} className="menu-settings-permission-item">
                            <label>{menu.charAt(0).toUpperCase() + menu.slice(1)}</label>
                            <input
                                type="checkbox"
                                checked={permissions[menu] || false}
                                onChange={(e) => handlePermissionChange(menu, e.target.checked)}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="menu-settings-footer">
                <Button type="primary" onClick={savePermissions}>Save</Button>
                <Button onClick={() => setOpen(true)} style={{ marginLeft: '10px' }}>Create</Button>
            </div>
        </div>
    );
};

export default MenuSettingsPage;











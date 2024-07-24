import { Button, Result } from 'antd';
// components/MenuSettingsPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';


import CreateRoleDrawer from './CreateRoleDrawer'

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
        //const response = await axios.get(`/api/roles/${role}`);
        const response = await request.read({ entity: "role", id: role });
        setId(response.result._id)
        setPermissions(response.result.permissions);
    };

    const handlePermissionChange = (menu, value) => {
        setPermissions({
            ...permissions,
            [menu]: value,
        });
    };

    const onClose = () => {

        setOpen(false)
    }

    const savePermissions = async () => {

        request.update({
            entity: 'role', id, jsonData: {
                name: selectedRole,
                permissions
            }
        });

    };
    return (

        <div style={{ textAlign: 'center', padding: '50px' }}>

            <div>
                <h1>Menu Settings</h1>
                <Button onClick={() => { setOpen(true) }} >Create</Button>
                <CreateRoleDrawer open={open} onClose={onClose} />
                <select onChange={(e) => setSelectedRole(e.target.value)} value={selectedRole}>
                    {roles.map(role => (
                        <option key={role} value={role}>{role}</option>
                    ))}
                </select>
                <div>
                    {Object.keys(permissions).map(menu => (
                        
                        <div key={menu}>
                            <label>{menu}</label>
                            <input
                                type="checkbox"
                                checked={permissions[menu] || false}
                                onChange={(e) => handlePermissionChange(menu, e.target.checked)}
                            />
                        </div>
                    ))}
                </div>
                <button onClick={savePermissions}>Save</button>
            </div>
        </div>



    );
};

export default MenuSettingsPage;

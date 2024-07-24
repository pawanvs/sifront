import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Drawer, Layout, Menu } from 'antd';

import { useAppContext } from '@/context/appContext';

import useLanguage from '@/locale/useLanguage';
import logoIcon from '@/style/images/logo-text.png';
import logoText from '@/style/images/logo.png';

import useResponsive from '@/hooks/useResponsive';

import { selectCurrentAdmin } from '@/redux/auth/selectors';
import request from '@/request/request';

import {
  SettingOutlined,
  CustomerServiceOutlined,
  ContainerOutlined,
  FileSyncOutlined,
  DashboardOutlined,
  TagOutlined,
  TagsOutlined,
  UserOutlined,
  CreditCardOutlined,
  MenuOutlined,
  FileOutlined,
  ShopOutlined,
  FilterOutlined,
  WalletOutlined,
  ReconciliationOutlined,
  AlertOutlined
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { selectLangDirection } from '@/redux/translate/selectors';

const { Sider } = Layout;

export default function Navigation() {
  const { isMobile } = useResponsive();

  return isMobile ? <MobileSidebar /> : <Sidebar collapsible={false} />;
}

function Sidebar({ collapsible, isMobile = false }) {
  let location = useLocation();
  const currentAdmin = useSelector(selectCurrentAdmin);

  const { state: stateApp, appContextAction } = useAppContext();
  const { isNavMenuClose } = stateApp;
  const { navMenu } = appContextAction;
  const [showLogoApp, setLogoApp] = useState(isNavMenuClose);
  const [currentPath, setCurrentPath] = useState(location.pathname.slice(1));
  const [permissions, setPermissions] = useState([])
  const [selectedRole, setSelectedRole] = useState(currentAdmin.role);
  const [menu, setMenu] = useState([]);

  

  useEffect(() => {
    fetchPermissions(selectedRole);
  }, [selectedRole]);
  const translate = useLanguage();
  const navigate = useNavigate();

  const items = [
    {
      key: 'dashboardModule',
      icon: <DashboardOutlined />,
      label: <Link to={'/'}>{translate('dashboard')}</Link>,
    },
    {
      key: 'customerModule',
      icon: <CustomerServiceOutlined />,
      label: <Link to={'/customer'}>{translate('customers')}</Link>,
    },
    {
      key: 'openInvoiceModule',
      icon: <AlertOutlined />,
      label: <Link to={'/open-invoice'}>{translate('Open Invoice')}</Link>,
    },
  
    {
      key: 'companyModule',
      icon: <ShopOutlined />,
      label: <Link to={'/company'}>{translate('companies')}</Link>,
    },
    {
      key: 'invoiceModule',
      icon: <ContainerOutlined />,
      label: <Link to={'/invoice'}>{translate('Invoice Register')}</Link>,
    },
    
    {
      label: translate('Settings'),
      key: 'settingsModule',
      icon: <SettingOutlined />,
      children: [
        {
          key: 'admin',
          // icon: <TeamOutlined />,
          label: <Link to={'/admin'}>{translate('user')}</Link>,
        },
    
        {
          key: 'Import',
          label: <Link to={'/import'}>{translate('Import')}</Link>,
        },
        {
          key: 'ClearData',
          label: <Link to={'/cleardata'}>{translate('Clear Data')}</Link>,
        },
        {
          key: 'Module',
          label: <Link to={'/module-config'}>{translate('Module Settings')}</Link>,
        },
      ],
    },
  ];



  const fetchPermissions = async (role) => {


    const response = await request.read({entity: "role", id: role});
  
    //setMenu(items);
    console.log(response);

    const tmppermissions = response.result.permissions;
    
    const result = items.filter((item) => {
      return tmppermissions.hasOwnProperty(item.key) ? tmppermissions[item.key]: false;
      
    });

    setMenu([...result]);
    setPermissions(response.result.permissions);
  };

  useEffect(() => {
    if (location)
      if (currentPath !== location.pathname) {
        if (location.pathname === '/') {
          setCurrentPath('dashboard');
        } else setCurrentPath(location.pathname.slice(1));
      }
  }, [location, currentPath]);

  useEffect(() => {
    if (isNavMenuClose) {
      setLogoApp(isNavMenuClose);
    }
    const timer = setTimeout(() => {
      if (!isNavMenuClose) {
        setLogoApp(isNavMenuClose);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [isNavMenuClose]);
  const onCollapse = () => {
    navMenu.collapse();
  };

  const langDirection = useSelector(selectLangDirection);
  return (
    <Sider
      collapsible={collapsible}
      collapsed={collapsible ? isNavMenuClose : collapsible}
      onCollapse={onCollapse}
      className="navigation"
      width={256}
      style={{
        overflow: 'auto',
        height: '100vh',
        direction: langDirection,
        position: isMobile ? 'absolute' : 'relative',
        bottom: '20px',
        ...(!isMobile && {
          background: 'none',
          border: 'none',
          [langDirection === 'rtl' ? 'right' : 'left']: '20px',
          top: '20px',
          borderRadius: '8px',
        }),
      }}
      theme={'light'}
    >
      <div
        className="logo"
        onClick={() => navigate('/')}
        style={{
          cursor: 'pointer',
        }}
      >

        <img src={logoIcon} alt="Logo" style={{ marginLeft: '-5px', height: '40px' }} />

        {!showLogoApp && (
          <img
            src={logoText}
            alt="Logo"
            style={{
              marginTop: '3px',
              marginLeft: '10px',
              height: '38px',
            }}
          />
        )}
      </div>
      <Menu
        items={menu}
        mode="inline"
        theme={'light'}
        selectedKeys={[currentPath]}
        style={{
          background: 'none',
          border: 'none',
          width: 256,
        }}
      />
    </Sider>
  );
}

function MobileSidebar() {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const langDirection = useSelector(selectLangDirection);
  return (
    <>
      <Button
        type="text"
        size="large"
        onClick={showDrawer}
        className="mobile-sidebar-btn"
        style={{ [langDirection === 'rtl' ? 'marginRight' : 'marginLeft']: 25 }}
      >
        <MenuOutlined style={{ fontSize: 18 }} />
      </Button>
      <Drawer
        width={250}
        contentWrapperStyle={{
          boxShadow: 'none',
        }}
        style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}
        placement={langDirection === 'rtl' ? 'right' : 'left'}
        closable={false}
        onClose={onClose}
        open={visible}
      >
        <Sidebar collapsible={false} isMobile={true} />
      </Drawer>
    </>
  );
}

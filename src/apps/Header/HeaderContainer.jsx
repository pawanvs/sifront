import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Avatar, Dropdown, Layout } from 'antd';

// import Notifications from '@/components/Notification';

import { SettingOutlined, LogoutOutlined, AppstoreOutlined, ToolOutlined, UserOutlined } from '@ant-design/icons';

import { selectCurrentAdmin } from '@/redux/auth/selectors';

import { FILE_BASE_URL } from '@/config/serverApiConfig';

import useLanguage from '@/locale/useLanguage';
import SelectLanguage from '@/components/SelectLanguage';
import ChooseCurrency from '@/components/ChooseCurrency';

import UpgradeButton from './UpgradeButton';
import AppsButton from './AppsButton';
import { selectLangDirection } from '@/redux/translate/selectors';

export default function HeaderContent() {
  const currentAdmin = useSelector(selectCurrentAdmin);
  const { Header } = Layout;

  let location = useLocation();

  const translate = useLanguage();

  const ProfileDropdown = () => {
    const navigate = useNavigate();
    return (
      <div className="profileDropdown" onClick={() => navigate('/profile')}>
        <Avatar
          size="large"
          className="last"
          src={currentAdmin?.photo ? FILE_BASE_URL + currentAdmin?.photo : undefined}
          style={{
            color: '#f56a00',
            backgroundColor: currentAdmin?.photo ? 'none' : '#fde3cf',
            boxShadow: 'rgba(150, 190, 238, 0.35) 0px 0px 6px 1px',
          }}
        >
          {currentAdmin?.name?.charAt(0)?.toUpperCase()}
        </Avatar>
        <div className="profileDropdownInfo">
          <p>
            {currentAdmin?.name} {currentAdmin?.surname}
          </p>
          <p>{currentAdmin?.email}</p>
        </div>
      </div>
    );
  };

  const DropdownMenu = ({ text }) => {
    return <span style={{}}>{text}</span>;
  };

  const items = [
    {
      label: <ProfileDropdown className="headerDropDownMenu" />,
      key: 'ProfileDropdown',
    },
    {
      type: 'divider',
    },
    {
      icon: <UserOutlined />,
      key: 'settingProfile',
      label: (
        <Link to={'/profile'}>
          <DropdownMenu text={translate('profile_settings')} />
        </Link>
      ),
    },
    // {
    //   icon: <ToolOutlined />,
    //   key: 'settingApp',
    //   label: <Link to={'/settings'}>{translate('app_settings')}</Link>,
    // },

    {
      type: 'divider',
    },

    {
      icon: <LogoutOutlined />,
      key: 'logout',
      label: <Link to={'/logout'}>{translate('logout')}</Link>,
    },
  ];

  const langDirection=useSelector(selectLangDirection)
  return (
    <Header
      style={{
        padding: '20px',
        background: '#f9fafc',
        display: 'flex',
        flexDirection: langDirection==="rtl"?"row":'row-reverse',
        justifyContent: 'flex-start',
        gap: ' 15px',
      }}
    >
      <Dropdown
        menu={{
          items,
        }}
        trigger={['click']}
        placement="bottomRight"
        stye={{ width: '280px', float: 'right' }}
      >
        {/* <Badge dot> */}
        <Avatar
          className="last"
          src={currentAdmin?.photo ? FILE_BASE_URL + currentAdmin?.photo : undefined}
          style={{
            color: '#f56a00',
            backgroundColor: currentAdmin?.photo ? 'none' : '#fde3cf',
            boxShadow: 'rgba(150, 190, 238, 0.35) 0px 0px 10px 2px',
            float: 'right',
            cursor: 'pointer',
          }}
          size="large"
        >
          {currentAdmin?.name?.charAt(0)?.toUpperCase()}
        </Avatar>
        {/* </Badge> */}
      </Dropdown>

      {/* <AppsButton /> */}
{/* 
      <UpgradeButton />

      <SelectLanguage />

      {location.pathname === '/' && <ChooseCurrency />} */}
    </Header>
  );
}

//  console.log(
//    '🚀 Welcome to IDURAR ERP CRM! Did you know that we also offer commercial customization services? Contact us at hello@idurarapp.com for more information.'
//  );

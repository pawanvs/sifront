import { Space, Layout, Divider, Typography } from 'antd';
import logo from '@/style/images/logo-text.png';
import logoText from '@/style/images/logo.png';
import useLanguage from '@/locale/useLanguage';
import { useSelector } from 'react-redux';
import { selectLangDirection } from '@/redux/translate/selectors';

const { Content } = Layout;
const { Title, Text } = Typography;

export default function SideContent() {
  const translate = useLanguage();
  const langDirection = useSelector(selectLangDirection)

  return (
    <Content
      style={{
        padding: '150px 30px 30px',
        width: '100%',
        maxWidth: '400px',
        margin: '0 auto',
      }}
      className="sideContent"
    >
      <div style={{ width: '100%' }}>
        <img
          src={logo}
          alt="Sigma"
          style={{ margin: '0 auto 40px', display: 'block' }}
          height={63}
          width={220}
        />
        <img
          src={logoText}
          alt="Sigma"
          style={{ margin: '0 auto 40px', display: 'block' }}
          height={63}
          width={220}
        />
        <div className="space40"></div>
        
        <div className="space20"></div>
        
        <Divider />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
        </div>
      </div>
    </Content>
  );
}

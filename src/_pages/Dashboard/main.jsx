import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { UserOutlined,MenuUnfoldOutlined,MenuFoldOutlined,SendOutlined,LogoutOutlined} from '@ant-design/icons';
import { Layout, Menu, theme ,Button,Empty, Row,Col,FloatButton,Tooltip,Avatar,Input} from 'antd';
import Chat from './chat';
import CreateGroup from './createNewGroup';
import SendText from './sendText';
import Actions from './actions';

const { Header, Content, Footer, Sider } = Layout;

const Main = () => {
    
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = React.useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [Groups, setGroups] = React.useState([]);
    const [GroupInfo, setGroupInfo] = React.useState(null);
    const [Messages, setMessages] = React.useState(null);
  
  const HandleLogout = () => { 
      axios.post("/logout/")
      .then(res => {
          navigate("/")
          axios.defaults.headers.common['Authorization'] = "";
          localStorage.removeItem("User")
      }).catch(err=>err)
  }
  
  const getUserGroups = () => {
    axios.get('/group/')
      .then(res => {
        const groupArray = res?.data?.results.map((group, index) => ({
          key: group.id,
          icon: React.createElement(UserOutlined),
          label: group.name,
        }))
        setGroups(groupArray)
      })
      .catch(err=>err)
  }

  const getUserGroupMessages = ({ item, key, keyPath, domEvent }) => {
    // key is group ID
    const group_id = parseInt(key)
    axios.get(`/group/${group_id}/messages`)
      .then(res => {
        setMessages(res?.data?.results)
        setGroupInfo(group_id)
      })
      .catch(err=>setMessages(null))
  }
  
  useEffect(() => {
    getUserGroups()
    return () => {
    }
  }, [])
  
  return (
    <Layout
    style={{
      minHeight: '100vh',
    }}
  >
        <Sider
        collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}
        >
        
        <div className="demo-logo-vertical" />
        {Groups.length > 0 && <Menu
          onClick={getUserGroupMessages}
          theme="dark"
          mode="inline"
          // defaultSelectedKeys={['1']}
          items={Groups} />}
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer, }}>
          <Row gutter={16}>
            <Col span={12}>
              <Row gutter={[16, 16]}>
                
                  <Col span={GroupInfo ? 4 : 1}>
                    {GroupInfo && <Actions GroupInfo={GroupInfo} />}
                  </Col>
                <Col span={4}>  
                  <CreateGroup getUserGroups={getUserGroups} />
                </Col>  
              </Row>
            </Col>
            <Col span={6} offset={6}>
            <Row justify="end">
                <Col span={4}>
                </Col>
                <Col span={4}>
                <Tooltip title="Logout!">
                <Button
                      type="text"
                      size='large'
                    icon={<LogoutOutlined />}
                    onClick={HandleLogout}
                    />
                </Tooltip>
                </Col>
                <Col span={4}>
                  <Avatar icon={<UserOutlined />} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Header>
        <Content
          style={{
            margin: '24px 16px 0',
            overflow: 'initial',
          }}
        >
          
          { !Messages && <Empty description={<span>Please Select a <a href="#API">Group</a></span>} />}
          { Messages &&
             Messages.map(message => <Chat message={message}/>)
          }
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          <SendText GroupInfo={GroupInfo} getUserGroupMessages={getUserGroupMessages}/>
        </Footer>
    
      </Layout>
    </Layout>
  );
};
export default Main;
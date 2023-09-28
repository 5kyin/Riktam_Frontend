import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { UserOutlined,MenuUnfoldOutlined,MenuFoldOutlined,SendOutlined,LogoutOutlined} from '@ant-design/icons';
import { Layout, Menu, theme ,Button,Empty, message,Row,Col,FloatButton,Tooltip,Avatar,Input} from 'antd';
import Chat from './chat';
import CreateGroup from './createNewGroup';
import SendText from './sendText';
import Actions from './actions';
import UserEdit from '../RegisterLogin/userEdit'
import ChatArea from './chatArea'

import { USERContext } from "../../_pages/App";

import io from 'socket.io-client';


const { Header, Content, Footer, Sider } = Layout;

const Main = () => {
  // const socket = new WebSocket(`ws://localhost:8000/ws/chat/${groupId}/`);
  const navigate = useNavigate();
  const { setUser } = React.useContext(USERContext);    
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
        axios.defaults.headers.common['Authorization'] = "";
        setUser(null)
          localStorage.removeItem("User")
      }).catch(err => err)
        .finally(() => {navigate("/")})
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
    axios.get(`/group/${group_id}/messages/`)
      .then(res => {
        setMessages(res?.data?.results)
        getGroupDetails(group_id)
      })
      .catch(err=>setMessages(null))
  }

  const getGroupDetails = (GID) => {
    axios.get(`/group/${GID}/`)
      .then(res => {
        if (res.data.results.length > 0) setGroupInfo(res.data.results[0])
        else setGroupInfo(null)
      })
      .catch(err => {
        message.error(err.response.data.message)
        setGroupInfo(null)
        setMessages(null)
      })
  }
    // MAIN FRAME FOR THE CHATCHANNELS
  useEffect(() => {
    getUserGroups()
    return () => {
    }
  }, [])
  
  return (
    <>
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
                  <Col span={GroupInfo ? 4 : 4}>
                    <Actions
                      GroupInfo={GroupInfo}
                      setMessages={setMessages}
                      getUserGroups={getUserGroups}
                    />
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
                  <UserEdit />
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
            {GroupInfo && <ChatArea groupID={GroupInfo}/>}
          {/* { !Messages && <Empty description={<span>Please Select a <a>Group</a> Or create one!</span>} />}
          { Messages &&
             Messages.map(message => <Chat message={message}/>)
          } */}
        </Content>
        {/* <Footer
          style={{
            textAlign: 'center',
          }}
        >
            {Messages && GroupInfo && <SendText GroupInfo={GroupInfo.id} getUserGroupMessages={getUserGroupMessages} />}
        </Footer> */}
    
      </Layout>
    </Layout>
    </>);
};
export default Main;
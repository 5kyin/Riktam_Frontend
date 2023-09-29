import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import {
    UserOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    SendOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import {
    Layout,
    Menu,
    theme,
    Button,
    Empty,
    message,
    Row,
    Col,
    FloatButton,
    Tooltip,
    Avatar,
    Input,
  Space,
  Card
} from 'antd';
import Chat from './chat';
import CreateGroup from './createNewGroup';
import SendText from './sendText';
import Actions from './actions';
import UserEdit from '../RegisterLogin/userEdit'
import ChatArea from './chatArea'

import {USERContext} from "../../_pages/App";

const {Header, Content, Footer, Sider} = Layout;

const Main = () => { // const socket = new WebSocket(`ws://localhost:8000/ws/chat/${groupId}/`);
    const navigate = useNavigate();
    const {USER, setUser} = React.useContext(USERContext);
    const [collapsed, setCollapsed] = React.useState(false);
    const [Socket, setSocket] = React.useState(null);

    const {token: { colorBgContainer }} = theme.useToken();
    const [Groups, setGroups] = React.useState([]);
    const [GroupInfo, setGroupInfo] = React.useState(null);

    const HandleLogout = () => {
        axios.post("/logout/").then(res => {
            axios.defaults.headers.common['Authorization'] = "";
            setUser(null)
            localStorage.removeItem("User")
        }).catch(err => err). finally(() => {
            navigate("/")
        })
    }

    const getUserGroups = () => {
        axios.get('/group/').then(res => {
            const groupArray = res?.data?.results.map((group, index) => ({ key: group.id, icon: React.createElement(UserOutlined), label: group.name }))
            if(groupArray.length === 0) setGroupInfo(null)
            setGroups(groupArray)
        }).catch(err => err)
    }

    const getUserGroupMessages = ({item, key, keyPath, domEvent}) => { // key is group ID
        const group_id = parseInt(key)
        getGroupDetails(group_id)
    }
    
    const getGroupDetails = (GID) => {
        axios.get(`/group/${GID}/`).then(res => {
            if (res.data.results.length > 0) {
                setSocket(new WebSocket(`ws://127.0.0.1:8000/ws/chat/?token=${
                    USER.token
                }&group_id=${GID}`))
                setGroupInfo(res.data.results[0])
            } else 
                setGroupInfo(null)
            
        }).catch(err => {
            message.error(err.response.data.message)
            setGroupInfo(null)
        })
    }
  
  useEffect(() => {
        getUserGroups()
      return () => {
        // if (Socket.readyState === WebSocket.OPEN) {
        //   Socket.close();
        // }
        }
    }, [])

    return (

        <Layout style={
            {minHeight: '100vh'}
        }>
            <Sider collapsible
                collapsed={collapsed}
                onCollapse={
                    (value) => setCollapsed(value)
            }>

                <div className="demo-logo-vertical"/> {
                Groups.length > 0 && <Menu onClick={getUserGroupMessages}
                    theme="dark"
                    mode="inline"
                    // defaultSelectedKeys={['1']}
                    items={Groups}/>
            } </Sider>
            <Layout className="site-layout">
          <Header  style={{ padding: 0, background: colorBgContainer }}>
            <Actions GroupInfo={GroupInfo} getUserGroups={getUserGroups}/>
            <CreateGroup getUserGroups={getUserGroups}/>
            <span gutter={[16, 16]}
              style={{
                display: 'inline',
                float:'right',
              }}>
              <span
                style={{
                  paddingLeft:'0.5em',
                  paddingRight:'0.5em'
                }}
              >
                  <Tooltip title="Logout!">
                    <Button type="text" size='large' icon={<LogoutOutlined/>} onClick={HandleLogout}/>
                  </Tooltip>
              </span>
              <span
                style={{
                  paddingLeft:'0.5em',
                  paddingRight:'1em'
                }}
              >
                  <UserEdit/>
              </span>
              </span>
                
                </Header>
          <Content
            id='Main-Chat-Area'
            style={
                    {
                        margin: '24px 16px 0',
                        maxHeight: "80vh",
                        overflow: 'auto'
                    }
                }>
                    {
                    GroupInfo && <ChatArea groupID={GroupInfo}
                        Socket={Socket}
                        USER={USER}/>
                }
                { !GroupInfo && <Empty description={<span>Please Select a <a>Group</a> Or create one!</span>} />}
                </Content>
                <Footer style={
                    {textAlign: 'center'}
                }>
                    {
                    GroupInfo && <SendText GroupInfo={
                            GroupInfo?.id
                        }
                        Socket={Socket}
                        getUserGroupMessages={getUserGroupMessages}/>
                } </Footer>

            </Layout>
        </Layout>
    );
};
export default Main;

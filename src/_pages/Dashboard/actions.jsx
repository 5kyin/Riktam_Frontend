import React from 'react';
import axios from 'axios';
import { MenuFoldOutlined, SmileOutlined,LeftCircleOutlined } from '@ant-design/icons';
import { Dropdown, Space,Button ,message} from 'antd';
import { USERContext } from "../../_pages/App";
import UsersList from "./usersList";


export default function Actions({ GroupInfo,setMessages,getUserGroups }) {
    const {USER} = React.useContext(USERContext);    
      const items = [
        GroupInfo &&{
          key: '1',
          label: (
              <Button
                type='link'
                onClick={(e) => { 
                    e.preventDefault()  
                  leaveGroup(GroupInfo.id)
              }}>
              Leave Group
            </Button>
              ),
              icon: <LeftCircleOutlined />,
        },
        GroupInfo && {
          key: '2',
            label: (
                <UsersList GroupInfo={GroupInfo} />
          ),
            icon: <SmileOutlined />,
        },
        {
          key: '3',
            label: (
                <UsersList GroupInfo={null} />
          ),
          icon: <SmileOutlined />,
        },
        GroupInfo && {
          key: '4',
            label: (
                <Button type='link' onClick={()=>deleteGroup(GroupInfo)}>Delete Group</Button>
            ),
          disabled: GroupInfo === null,
          icon: <SmileOutlined />,
        },
      ];
      
      const leaveGroup = (GID) => {
          axios.patch(`group/${GID}/leave/${USER.id}/`)
              .then(res => {
                  setMessages(null)
                  getUserGroups()
                  message.success(res.data?.message)
              })
              .catch(err => message.error(err.response.data.message))
        // group/<int:group_id>/join/<int:user_id>/
      }
    const deleteGroup = (GID) => { 
        if(!GID?.id) return
        axios.delete(`group/${GID.id}/delete/`)
        .then(res => {
            setMessages(null)
            getUserGroups()
            message.success(res.data?.message)
        })
        .catch(err => message.error(err.response.data.message))
    }

    return (
        <>
        <Dropdown menu={{ items }}>
        {/* <a onClick={(e) => e.preventDefault()}> */}
            <Space>
                <Button
                    type="text"
                    icon={<MenuFoldOutlined />}
                    style={{
                        fontSize: '16px',
                        width: 64,
                        height: 64,
                    }}
                >
                    Actions
                </Button>
            </Space>
        {/* </a> */}
            </Dropdown>
    </>
)}

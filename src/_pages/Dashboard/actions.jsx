import React from 'react';
import axios from 'axios';
import { MoreOutlined, SmileOutlined,LeftCircleOutlined } from '@ant-design/icons';
import { Dropdown, Space,Button } from 'antd';
import { USERContext } from "../../index";


export default function Actions({ GroupInfo }) {
    const USER = React.useContext(USERContext);
      const items = [
        {
          key: '1',
          label: (
              <a onClick={(e) => { 
                e.preventDefault()  
                  leaveGroup(GroupInfo)
              }}>
              Leave Group
            </a>
              ),
          icon: <LeftCircleOutlined />,
        },
        {
          key: '2',
            label: (
                <a>
                    Show Members
                </a>
          ),
          icon: <SmileOutlined />,
        },
      ];
      
      const leaveGroup = (GID) => {
          console.log(USER);
          axios.patch(`group/${GID}/leave/${USER.id}/`)
        .then(res => {
          console.log(res.data);
      }).catch(err=>console.log(err.response.data))
        // group/<int:group_id>/join/<int:user_id>/
        // console.log(groupInfo);
    }

    return (
        <Dropdown menu={{items}}>
        {/* <a onClick={(e) => e.preventDefault()}> */}
            <Space>
                <Button
                    type="text"
                    icon={<MoreOutlined />}
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
)}

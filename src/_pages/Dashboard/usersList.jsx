import React, { useEffect, useState } from 'react';
import { Button, Drawer,Avatar, List,Tag,message} from 'antd';
import axios from 'axios';
import AddUserToGroup from './addUserToGroup';
import { USERContext } from "../../_pages/App";


export default function UsersList({ GroupInfo }){
    const { USER } = React.useContext(USERContext);    
//   const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = useState(false);
  const [Members, setMembers] = useState([]);
  
  const showDrawer = () => {
      setOpen(true);
      if (GroupInfo) { 
          axios(`group/${GroupInfo.id}/members/`)
                .then(res => {
                    setMembers(res.data.results)
                }).catch(err =>{
                    // messageApi.error(err.response.data.message)
                }) 
      } else {
          axios(`users/`)
          .then(res => {
              setMembers(res.data.results)
          }).catch(err =>{
              // messageApi.error(err.response.data.message)
          }) 

      }
  };
  
  const onClose = () => { 
        setMembers([])
        setOpen(false);
  };

 const addOrRemoveUser = (type,userID) => {
     //   group/<int:group_id>/leave/<int:user_id>/
            axios.patch(`group/${GroupInfo.id}/${type}/${userID}/`)
                .then(res => {
                    message.success(res.data.message)
                }).catch(err =>{
                    message.error(err.response.data.message)
                }).finally(()=>onClose())
     
  }
  return (
      <>
      <Button type="link" onClick={showDrawer}>
        {GroupInfo ? "Show Members" : "Show Users" }
    </Button>
          <Drawer title={GroupInfo ? "Group Members" : "All Users" } placement="right" onClose={onClose} open={open}>
              {Members.length !== 0 &&
                  <List
                      itemLayout="horizontal"
                      dataSource={Members}
                      renderItem={(item, index) => (
                          <List.Item
                              actions={[
                                  GroupInfo ?
                                      item.id === GroupInfo.owner?
                                          <></>:
                                          <Button type="link" onClick={() => addOrRemoveUser('leave', item.id)}>Remove</Button> :
                                            USER.id !== item.id ?
                                          <AddUserToGroup UID={item.id} /> : <></>]}
                          >
                              <List.Item.Meta
                                  avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                                  title={<a href="https://ant.design">{item.username}</a>}
                                  description={
                                      GroupInfo ?
                                      item.id === GroupInfo.owner ?
                                          <Tag color="purple">ADMIN</Tag> :
                                          <Tag color="cyan">MEMBER</Tag> :
                                          <Tag color="geekblue">USER</Tag> 
                                        }
                              />
                          </List.Item>
                )}
            />}
      </Drawer>
    </>
  );
};
import React, { useState } from 'react';
import axios from 'axios'
import { Button, message, Popconfirm,Select } from 'antd';

export default function AddUserToGroup({UID}) {
    const [Add, setAdd] = useState(false);
    const [Groups, setGroups] = React.useState([]);
    
    const getUserGroups = () => {
        axios.get('/group/')
          .then(res => {
            const groupArray = res?.data?.results.map((group, index) => ({
              key: group.id,
              value: group.id,
              label: group.name,
            }))
            setGroups(groupArray)
          })
          .catch(err=>err)
    }

    const addUserToSelectedGroup = (ID) => { 
        // group/<int:group_id>/join/<int:user_id>/
        axios.patch(`/group/${ID}/join/${UID}/`)
        .then(res => message.success(res.data.message))
        .catch(err => message.error(err.response.data.message))
        .finally(()=>onCancel())
    }
    
    const onOpen = (e) => {
        setAdd(!Add)
        getUserGroups()
      };
      const onCancel = (e) => {
        setAdd(false)
        setGroups([])
      };
    
    return <>
        {!Add && <Button type='link' onClick={onOpen}>add</Button>}
        {Add && Groups.length !== 0 &&
            <Select
            // defaultValue="lucy"
                placeholder="Select a group"
                allowClear
                onClear={onCancel}
                style={{
                    width: 120,
                }}
                onChange={addUserToSelectedGroup}
                options={Groups}
            />}
    </>
};
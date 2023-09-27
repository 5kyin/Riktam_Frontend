import React, { useState } from 'react';
import { Button, Popconfirm,Input } from 'antd';
import axios from 'axios';

const CreateGroup = ({getUserGroups}) => {
  const [open, setOpen] = useState(false);
  const [Status, setStatus] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showPopconfirm = () => {
    setOpen(true);
  };

  const handleOk = () => {
    
      const element = document.getElementById("group-creating-input")  
      if (element && element.value.length === 0) setStatus("error")
      if (element && element.value.length !== 0) { 
          setConfirmLoading(true);
          const group = { 'name': element.value }
            axios.post('/group/',group)
            .then(res => {
                setOpen(false);
                setConfirmLoading(false);
                getUserGroups()
                })
                .catch(err => err)
                .finally(() => {
                    element.value = ""
          })
      }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Popconfirm
      title="Create Your New Group"
          description={<Input
              onChange={()=>setStatus("")}
              status={Status} id='group-creating-input' placeholder="Group Name" />
          }
      open={open}
      onConfirm={handleOk}
      okButtonProps={{ loading: confirmLoading }}
      onCancel={handleCancel}
    >
          <Button type="primary" onClick={showPopconfirm}>
              Create New Group
      </Button>
    </Popconfirm>
  );
};

export default CreateGroup;
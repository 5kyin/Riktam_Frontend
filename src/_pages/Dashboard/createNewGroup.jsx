import React, { useState } from 'react';
import { Button, Popconfirm,Input, message } from 'antd';
import axios from 'axios';

const CreateGroup = ({getUserGroups}) => {
  const [open, setOpen] = useState(false);
  const [Text, setText] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showPopconfirm = () => {
    setOpen(true);
  };

  const handleOk = () => {
    
      const element = document.getElementById("group-creating-input")  
      // if (element && element.value.length === 0) setText("error")
      if (element && element.value.length !== 0) { 
          setConfirmLoading(true);
          const group = { 'name': element.value }
            axios.post('/group/',group)
              .then(res => {
                message.success(`${Text} Group Created`)
                setOpen(false);
                setConfirmLoading(false);
                getUserGroups()
                })
                .catch(err => err)
                .finally(() => {
                  setText("")
          })
      }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Popconfirm
      title="Create Your New Group"
      description={
        <Input
          onChange={(e) =>
            setText(e.target.value)
          }
            status={Text.length === 0 && "error"} 
            value={Text}
            id='group-creating-input'
            placeholder="Group Name" />
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
import React from 'react'
import axios from 'axios';
import { SendOutlined} from '@ant-design/icons';
import { Button,Input} from 'antd';

export default function SendText({GroupInfo,getUserGroupMessages}) {
    const [Text, setText] = React.useState("");

    const sendTextMessage = (text) => {
        // group/GroupInfo/messages/
        console.log(text.length !== 0);
        if (text.length === 0) return 
        if (text.length !== 0) { 
            const textdata = {
                "content": text,
            }

            axios.post(`/group/${GroupInfo}/messages/`, textdata)
               .then(res => {getUserGroupMessages({ key: GroupInfo })})
               .catch(err => err)
               .finally(()=>setText(""))
        }
    }
    return (
        <Input
            id="Main-Chat-Input"
            allowClear
            defaultValue={Text}
            onChange={(e) => {
                setText(e.target.value)
            }}
          onPressEnter={(e)=>sendTextMessage(e.target.value)}
          suffix={<Button disabled={Text.length === 0 } onClick={()=>sendTextMessage(Text)} type="primary" shape="circle" size='medium' icon={<SendOutlined />} />} />
  )
}

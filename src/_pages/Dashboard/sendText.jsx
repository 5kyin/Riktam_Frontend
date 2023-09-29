import React from 'react'
import axios from 'axios';

import { USERContext } from "../../_pages/App";
import { SendOutlined} from '@ant-design/icons';
import { Button,Input} from 'antd';

export default function SendText({ Socket }) {
    const inputRef = React.useRef(null);
    const {USER} = React.useContext(USERContext);    
    const [inputValue, setInputValue] = React.useState('');

    const [Text, setText] = React.useState("");

    const sendTextMessage = (text) => {
        if (text.length === 0) return 
            const messageData = {
                content: text,
                sender: USER.id,
                command:'send_group_messages',
            };
        Socket.send(JSON.stringify(messageData));
        setInputValue('');
        }
    return (<>
        <Input value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onPressEnter={() => sendTextMessage(inputValue)}
            suffix={<Button disabled={false} onClick={()=>sendTextMessage(inputValue)} type="primary" shape="circle" size='medium' icon={<SendOutlined />} />}
        />
        
    </>
  )
}

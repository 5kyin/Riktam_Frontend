import React from 'react'
import { Card } from 'antd';
import { USERContext } from "../../_pages/App";
import HandleLikes from "./handleLikes";

export default function Chat({ message }) {
    const {USER} = React.useContext(USERContext);    
    // console.log(message);
    
  const getDataDisplay = (direction) => {
    if (direction){
        if (message.sender.id !== USER.id) return <b>{message.sender.username.toUpperCase()}</b>
        return <HandleLikes Message={message} UID={USER.id} />
      }
        if(message.sender.id === USER.id) return <b>{message.sender.username.toUpperCase()}</b>
      return <HandleLikes Message={message} UID={USER.id} />
      }

    return (
        // <ConfigProvider direction={message.sender.id === USER.id ? "rtl":'ltr'}>
            <Card
              key={message.id}
              title={getDataDisplay(true)}
              size='small'
              extra={getDataDisplay()}>
                <i style={{fontSize:'1em' ,float: message.sender.id === USER.id ? 'right':'left'}}>{message.content}</i>
            </Card>
  )
}

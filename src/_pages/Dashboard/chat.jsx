import React from 'react'
import { Card,Typography } from 'antd';
import { USERContext } from "../../_pages/App";
import HandleLikes from "./handleLikes";

export default function Chat({ message,Socket }) {
    const {USER} = React.useContext(USERContext);    
    // console.log(message);
    
  const getDataDisplay = (direction) => {
    if (direction){
        if (message.sender.id !== USER.id) return <b>{message.sender.username.toUpperCase()}</b>
        return <HandleLikes Message={message} USER={USER} Socket={Socket} />
      }
        if(message.sender.id === USER.id) return <b>{message.sender.username.toUpperCase()}</b>
      return <HandleLikes Message={message} USER={USER} Socket={Socket} />
      }

    return (
        // <ConfigProvider direction={message.sender.id === USER.id ? "rtl":'ltr'}>
      <Card
              hoverable
              id={`M_${message.id}`}
              title={getDataDisplay(true)}
              size='small'
              extra={getDataDisplay()}>
        <Typography.Text
          italic
          style={{ fontSize: '1em', float: message.sender.id === USER.id ? 'right' : 'left' }}
        >{message.content}</Typography.Text>
        </Card>
  )
}

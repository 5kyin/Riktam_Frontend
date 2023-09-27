import React from 'react'
import { Card } from 'antd';

export default function Chat({ message }) {
    console.log(message);
  return (
      <Card
          key={message.id}
          title={message.sender.username.toUpperCase()}
          size='small'
          extra={<a href="#">More</a>}>
        {message.content}
        </Card>
  )
}

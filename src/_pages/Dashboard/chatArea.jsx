import React, { useEffect } from 'react'
import { Button, Card ,Space, message} from 'antd';
import Chat from './chat';

export default function ChatArea({ groupID, USER, Socket }) {
    const [Messages, setMessages] = React.useState([]);
    Socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.command === 'existing_message') {
            setMessages(pv => [...pv, data.message])
        } else if (data.command === 'like_message') { 
            // expensive Operation
            setMessages(pv => pv.map(existingMessage => existingMessage.id === data.message.id ? data.message : existingMessage))
        } else if (data.command === 'new_message') {
            setMessages(pv=>[...pv,data.message])
            setTimeout(() => {
                document.getElementById(`M_${data.message.id}`).scrollIntoView({ 
                    behavior: 'smooth' 
                 })
            }, 500);
            
        }
    }

    useEffect(() => {    
        return () => {
            setMessages([])
      }
    }, [groupID])

    useEffect(() => { 
        return () => {
      }
    }, [Messages])

    return (
         Messages.length > 0 && Messages.map(message => <Chat Socket={Socket} message={message}/>)
  )
}

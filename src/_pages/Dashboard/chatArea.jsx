import React, { useEffect } from 'react'

export default function ChatArea({ groupID }) {
    const socket = new WebSocket(`ws://localhost:8000/ws/chat/${groupID.id}/`); 
    useEffect(() => {
      console.log(groupID);
    // Create a WebSocket connection
        
        
        socket.onopen = (event) => {
        console.log("WebSocket connection established:", event);
        };

        // Event handler when a message is received from the server
        socket.onmessage = (event) => {
        const messageData = JSON.parse(event.data);
        console.log("Received message:", messageData);
        };

        // Sending a message through WebSocket
        // const messageData = {
        // group_id: 1,  // Replace with the ID of the chat group
        // message: "Hello, this is a test message."
        // };

        // socket.send(JSON.stringify(messageData));

      return () => {
        socket.disconnect();
      }
    }, [groupID])
    
  return (
    <div>chatArea</div>
  )
}

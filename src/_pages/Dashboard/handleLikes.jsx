import React from 'react'
import axios from 'axios'
import { message,Badge,Avatar } from 'antd';
import {LikeOutlined,LikeFilled} from '@ant-design/icons';


export default function HandleLikes({ Message, USER,Socket }) {
    const PostLiked = () => {
            const messageData = {
                content: Message.id,
                sender: USER.id,
                command:'send_group_likes',
            };
        
        Socket.send(JSON.stringify(messageData));
        // /group/2/messages/2/like/
        // axios.patch(`/group/${Message?.group}/messages/${Message?.id}/like/`)
        //     .then(res => {
        //         message.success(res.data.message)
        //     }).catch(err => {})
    }
    const getIfCurrentUserLikedMessage = () => {
        return Message.likes.find(user => user.id === USER.id)
    }
    return <Badge offset={[9, 8]} size='small' count={Message.likes.length}>
        { getIfCurrentUserLikedMessage() ? <LikeFilled onClick={PostLiked} /> : <LikeOutlined onClick={PostLiked} /> }
    </Badge>
}

import React from 'react'
import axios from 'axios'
import { message,Badge,Avatar } from 'antd';
import {LikeOutlined,LikeFilled} from '@ant-design/icons';


export default function HandleLikes({Message,UID}) {
    const PostLiked = () => {
        // /group/2/messages/2/like/
        axios.patch(`/group/${Message?.group}/messages/${Message?.id}/like/`)
            .then(res => {
                message.success(res.data.message)
            }).catch(err => {})
    }
    return<Badge offset={[9, 8]} size='small' count={Message.likes.length}>
        {Message.likes.indexOf(UID) ?
            <LikeOutlined onClick={PostLiked} /> :
            <LikeFilled onClick={PostLiked} />
        }
    </Badge>
}

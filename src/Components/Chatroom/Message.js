import React from 'react';
import {ListItem} from "material-ui";

const Message = ({chat, me}) => (
    chat.sender === me ?
        <ListItem style={{textAlign: 'right'}} primaryText={chat.content}/>
        : <ListItem primaryText={chat.content} secondaryText={chat.from} secondaryTextLines={1}/>
);

export default Message;
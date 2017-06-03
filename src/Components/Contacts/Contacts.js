import React from 'react';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

const Contacts = () => (
    <div>
        <List>
            <Subheader>Recent chats</Subheader>
            <ListItem
                primaryText="Brendan Lim"
                leftAvatar={<Avatar src="http://www.material-ui.com/images/ok-128.jpg"/>}
                rightIcon={<CommunicationChatBubble />}
            />
            <ListItem
                primaryText="Eric Hoffman"
                leftAvatar={<Avatar src="http://www.material-ui.com/images/kolage-128.jpg"/>}
                rightIcon={<CommunicationChatBubble />}
            />
            <ListItem
                primaryText="Grace Ng"
                leftAvatar={<Avatar src="http://www.material-ui.com/images/uxceo-128.jpg"/>}
                rightIcon={<CommunicationChatBubble />}
            />
            <ListItem
                primaryText="Kerem Suer"
                leftAvatar={<Avatar src="http://www.material-ui.com/images/kerem-128.jpg"/>}
                rightIcon={<CommunicationChatBubble />}
            />
            <ListItem
                primaryText="Raquel Parrado"
                leftAvatar={<Avatar src="http://www.material-ui.com/images/raquelromanp-128.jpg"/>}
                rightIcon={<CommunicationChatBubble />}
            />
        </List>
        <Divider />
        <List>
            <Subheader>Previous chats</Subheader>
            <ListItem
                primaryText="Chelsea Otakan"
                leftAvatar={<Avatar src="http://www.material-ui.com/images/chexee-128.jpg"/>}
            />
            <ListItem
                primaryText="James Anderson"
                leftAvatar={<Avatar src="http://www.material-ui.com/images/jsa-128.jpg"/>}
            />
        </List>
    </div>
);

export default Contacts;
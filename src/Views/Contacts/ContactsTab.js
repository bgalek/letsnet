// @flow
import React, { Component } from 'react';
import { List, ListItem, Divider, Avatar } from 'material-ui';
import { PropTypes } from 'prop-types';

export default class BrowseTab extends Component {

    static propTypes = {
        contacts: PropTypes.object.isRequired,
    };

    render() {
        const contacts = this.props.contacts;

        let listItems = [];
        for (let contact in contacts) {
            let initials = contacts[contact].name.split(' ').map((n)=>n[0]).join('');
            let item =
                <div key={contacts[contact].name}>
                    <ListItem
                        leftAvatar={<Avatar>{initials}</Avatar>}
                        primaryText={contacts[contact].name}
                        secondaryText={contacts[contact].position}
                    />
                    <Divider inset={true} />
                </div>;
            listItems.push(item);
        }

        return (
            <List>
                {listItems}
            </List>
        );
    }
}
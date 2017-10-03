// @flow
import React, { Component } from 'react';
import { List, ListItem, Divider, Avatar } from 'material-ui';
import { PropTypes } from 'prop-types';
import PersonListItem from "../../Components/PersonListItem/PersonListItem";
import Messages from '../../Messages';

export default class BrowseTab extends Component {

    static propTypes = {
        contacts: PropTypes.object.isRequired
    };

    render() {
        const contacts = this.props.contacts;

        let listItems = [];
        for (let contact in contacts) {
            let contactItem = <PersonListItem key={contact} person={contacts[contact]}/>;
            listItems.push(contactItem);
        }

        if (listItems.length > 0) {
            return (<List>{listItems}</List>);
        } else {
            return <div style={{textAlign: 'center'}}><h3>{Messages.noContacts}</h3></div>;
        }
    }
}
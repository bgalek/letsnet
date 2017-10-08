// @flow
import React, {Component} from 'react';
import {Tab, Tabs} from "material-ui";
import {PropTypes} from 'prop-types';
import Messages from '../../Messages';
import ContactsTab from './ContactsTab';
import AddContactTab from './AddContactTab';

export default class Contacts extends Component {

    constructor(props) {
        super(props);
        this.state = {selectedIndex: 0};
    }

    static propTypes = {
        handleAddContact: PropTypes.func.isRequired,
        contacts: PropTypes.object.isRequired,
        areas: PropTypes.object.isRequired
    };

    render() {
        return (
            <Tabs value={this.state.selectedIndex}>
                <Tab label={Messages.myContacts} value={0}>
                    <ContactsTab contacts={this.props.contacts}/>
                </Tab>
                <Tab label={Messages.addContact} value={1}>
                    <AddContactTab handleAddContact={this.props.handleAddContact} areas={this.props.areas}/>
                </Tab>
            </Tabs>
        );
    }
}
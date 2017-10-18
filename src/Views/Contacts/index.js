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
        handleRemoveContact: PropTypes.func.isRequired,
        contacts: PropTypes.object.isRequired,
        areas: PropTypes.object.isRequired
    };

    prepareContacts() {
        const {contacts} = this.props;
        return Object.keys(contacts)
            .map(it => {
                const contact = contacts[it];
                return {
                    id: it,
                    name: contact.name,
                    email: contact.email,
                    companyName: contact.companyName,
                    phoneNumber: contact.phoneNumber,
                    position: contact.position
                };
            });
    }

    handleChange(value) {
        this.setState({
            selectedIndex: value,
        });
    }

    render() {
        return (
            <Tabs
                value={this.state.selectedIndex}
                onChange={(val) => this.handleChange(val)}
            >
                <Tab label={Messages.myContacts} value={0}>
                    <ContactsTab contacts={this.prepareContacts()} handleRemoveContact={this.props.handleRemoveContact} onSele/>
                </Tab>
                <Tab label={Messages.addContact} value={1}>
                    <AddContactTab handleAddContact={this.props.handleAddContact} areas={this.props.areas}/>
                </Tab>
            </Tabs>
        );
    }
}
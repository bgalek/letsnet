// @flow
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {List} from 'material-ui';
import PersonListItem from '../../Components/PersonListItem/PersonListItem';
import ContactDetails from './ContactDetails';
import Messages from '../../Messages';

export default class ContactsTab extends Component {

    constructor() {
        super();
        this.state = {
            selectedContact: null
        }
    }

    static propTypes = {
        contacts: PropTypes.array.isRequired
    };

    handleContactClick(contact) {
        this.setState({
            selectedContact: contact
        });
    }

    render() {
        const contacts = this.props.contacts.map(contact =>
            <PersonListItem key={contact.id} person={contact} onTouchTap={() => this.handleContactClick(contact)}/>);

        if (this.state.selectedContact) {
            return (
                <ContactDetails
                    contact={this.state.selectedContact}
                    handleClose={() => this.setState({selectedContact: null})}/>
            );
        } else if (contacts.length > 0) {
            return <List>{contacts}</List>;
        } else {
            return <div style={{textAlign: 'center'}}><h3>{Messages.noContacts}</h3></div>;
        }
    }
}
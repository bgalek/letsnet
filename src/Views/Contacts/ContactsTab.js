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
        contacts: PropTypes.array.isRequired,
        handleRemoveContact: PropTypes.func.isRequired
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
                    handleRemoveContact={this.props.handleRemoveContact}
                    handleClose={() => this.setState({selectedContact: null})}/>
            );
        } else if (contacts.length > 0) {
            return <List>{contacts}</List>;
        } else {
            return (
            <div style={{textAlign: 'center', padding: 20}}>
                {Messages.noContacts.split('\n').map((text, index) => {return <h3 key={index}>{text}</h3>;})}
            </div>);
        }
    }
}
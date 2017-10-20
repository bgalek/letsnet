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
            selectedContact: null,
            contacts: []
        }
    }

    static contextTypes = {
        profile: PropTypes.object,
        database: PropTypes.object,
    };

    componentDidMount() {
        this.context.database.ref(`/users/${this.context.profile.id}/contacts`)
            .on('value', (snapshot) => {
                Object.values(snapshot.val() || [])
                    .forEach(contact => {
                        const userRef = this.context.database.ref(`/users/${contact.userId}`);
                        userRef.once('value', (snapshot) => {
                            console.log(contact);
                            if (snapshot.val()) {
                                const item = {
                                    id: contact.userId,
                                    name: snapshot.val().name,
                                    email: contact.invitation.fromEmail,
                                    companyName: snapshot.val().companyName,
                                    phoneNumber: snapshot.val().phoneNumber,
                                    position: snapshot.val().position
                                };
                                const newContact = this.state.contacts.slice();
                                newContact.push(item);
                                this.setState({contacts: newContact});
                            }
                        });
                    });
            });
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
        console.log(this.state.contacts);
        const contacts = this.state.contacts.map(contact =>
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
                    {Messages.noContacts.split('\n').map((text, index) => {
                        return <h3 key={index}>{text}</h3>;
                    })}
                </div>);
        }
    }
}
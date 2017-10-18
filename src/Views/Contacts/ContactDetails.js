// @flow
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {Avatar, FlatButton, Paper, List, ListItem, RaisedButton} from 'material-ui';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Messages from '../../Messages';

export default class ContactDetails extends Component {

    static propTypes = {
        contact: PropTypes.object.isRequired,
        handleClose: PropTypes.func.isRequired,
        handleRemoveContact: PropTypes.func.isRequired
    };

    getInitials(name) {
        let names = name.split(' ');
        let initials = names.map((name) => {return name.charAt(0).toUpperCase()}).join('');
        return initials;
    }

    render() {
        const contact = this.props.contact;
        const items = [contact.name, contact.email, contact.position, contact.companyName, contact.phoneNumber];
        const listItems = items.map((it, index) => { return <ListItem key={index} disabled={true} style={{padding: 10}}>{it}</ListItem> });
        return (
            <Paper style={{margin: 20, textAlign: 'center'}}>
                <FlatButton style={{position: 'absolute', right: 0}}
                            icon={<NavigationClose/>}
                            onClick={this.props.handleClose}/>
                <Avatar size={160} style={{marginTop: 45}}>{this.getInitials(contact.name)}</Avatar>
                <List>{listItems}</List>
                <RaisedButton label={Messages.removeContact} onClick={() => {
                    this.props.handleRemoveContact(contact.id);
                    this.props.handleClose();
                }} style={{marginBottom: 12}}/>
            </Paper>
        );
    }
}
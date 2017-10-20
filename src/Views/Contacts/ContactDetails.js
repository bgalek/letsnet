// @flow
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {Avatar, FlatButton, Paper, List, ListItem} from 'material-ui';
import Messages from '../../Messages';
import BackButton from "../../Components/BackButton/BackButton";
import PersonListItem from "../../Components/PersonListItem/PersonListItem";

export default class ContactDetails extends Component {

    static propTypes = {
        contact: PropTypes.object.isRequired,
        handleClose: PropTypes.func.isRequired,
        handleRemoveContact: PropTypes.func.isRequired
    };

    render() {
        const contact = this.props.contact;
        const items = [contact.name, contact.email, contact.position, contact.companyName, `tel://${contact.phoneNumber}`];
        const listItems = items.map((it, index) => {
            return <ListItem key={index} disabled={true} style={{padding: 10}}>{it}</ListItem>
        });
        return (<div>
                <BackButton handleClick={this.props.handleClose}/>
                <Paper style={{margin: 20, textAlign: 'center'}}>
                    <Avatar size={160} style={{marginTop: 45}}>{PersonListItem.getInitials(contact.name)}</Avatar>
                    <List>{listItems}</List>
                    <FlatButton primary={true} label={Messages.removeContact} onClick={() => {
                        this.props.handleRemoveContact(contact.id);
                        this.props.handleClose();
                    }} style={{marginBottom: 12}}/>
                </Paper>
            </div>
        );
    }
}
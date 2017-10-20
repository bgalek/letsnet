// @flow
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {RaisedButton} from "material-ui";
import Messages from "../../Messages";
import firebase from 'firebase';

export default class InviteActionButton extends Component {

    static contextTypes = {
        profile: PropTypes.object,
        database: PropTypes.object,
        messaging: PropTypes.object
    };

    handleClick = () => {
        this.context.messaging.showMessage(Messages.invitationSent);
        this.context.database.ref(`/users/${this.props.person.id}/invitations/received`).push({
            from: this.context.profile.id,
            sender: `${this.context.profile.firstName} ${this.context.profile.lastName}`,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            fromEmail: this.context.profile.email
        });
        this.context.database.ref(`/users/${this.context.profile.id}/invitations/sent`).push({
            to: this.props.person.id,
            receiver: this.props.person.name,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });
        this.props.onClick();
    };

    render() {
        return (
            <RaisedButton disabled={this.props.disabled} onTouchTap={this.handleClick} primary={true} label={Messages.invite}/>
        );
    }
}
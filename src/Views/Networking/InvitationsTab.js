// @flow
import React, {Component} from 'react';
import Messages from "../../Messages";
import PropTypes from "prop-types";
import {Card, CardHeader, Avatar, CardActions, FlatButton} from "material-ui";
import moment from "moment";

export default class InvitationsTab extends Component {
    static contextTypes = {
        profile: PropTypes.object,
        database: PropTypes.object,
        handleAddContact: PropTypes.func
    };

    constructor() {
        super();
        this.state = {
            invitations: []
        }
    }

    componentDidMount() {
        this.context.database.ref(`/users/${this.context.profile.id}/invitations/received`).on('value', (snapshot) => {
            if (snapshot.val()) {
                let invitations = Object.keys(snapshot.val())
                    .map(it => {
                        let invitation = snapshot.val()[it];
                        return {
                            id: it,
                            from: invitation.from,
                            sender: invitation.sender,
                            timestamp: invitation.timestamp
                        }
                    });
                this.setState({invitations: invitations});
            }
        });
    }

    getInitials(name) {
        let names = name.split(' '),
            initials = names[0].substring(0, 1).toUpperCase();

        if (names.length > 1) {
            initials += names[names.length - 1].substring(0, 1).toUpperCase();
        }
        return initials;
    };

    addToContacts(userId, invitationId) {
        let userRef = this.context.database.ref(`/users/${userId}`);
        userRef.on('value', (dataSnapshot) => {
            console.log(dataSnapshot.val());
            let contact = {
                name: dataSnapshot.val().name + ' ' + dataSnapshot.val().lastname,
                companyName: dataSnapshot.val().companyName,
                phoneNumber: dataSnapshot.val().phoneNumber,
                position: dataSnapshot.val().position,
                email: ''
            };
            console.log(contact);
            this.props.handleAddContact(contact);
        });
    }

    removeInvitation(invitationId) {
        let invitationRef = this.context.database.ref(`/users/${this.context.profile.id}/invitations/received/${invitationId}`);
        invitationRef.remove()
            .then(() => { console.log("Invitation remove succeeded.") })
            .catch((error) => {
                console.log("Invitation remove failed: " + error.message)
            });
    }

    render() {
        console.log(JSON.stringify(this.state.invitations,0,2));

        const invitationCards = this.state.invitations.map((invitation, index) => {
            return (
            <Card key={index} style={{margin: 20}}>
                <CardHeader
                    title={invitation.sender}
                    subtitle='wysyła zaproszenie do networkingu'
                    avatar={<Avatar size={50}>{this.getInitials(invitation.sender)}</Avatar>}
                />
                <CardActions style={{textAlign: 'right'}}>
                    <FlatButton label={Messages.accept} onTouchTap={() => this.addToContacts(invitation.from, invitation.id)} />
                    <FlatButton label={Messages.decline} onClick={() => {this.removeInvitation(invitation.id)}}/>
                </CardActions>
            </Card>
            );
        });
        // const list = this.state.invitations.map((invitation, index) => <div key={index}>do {invitation.receiver} o {moment(invitation.timestamp).fromNow()}</div>);
        return (
            <div>
                {(invitationCards.length) ? invitationCards : <h3 style={{ textAlign: 'center'}}>{Messages.noInvitations}</h3>}
            </div>
        );
    }
}